# 34bot.py

import os
import time
import discord
import datetime
import asyncio
from discord.ext import commands
from dotenv import load_dotenv
from DagarTillPropellerkeps import days_until_propellerkeps

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
GUILD = os.getenv("DISCORD_GUILD")
intents = discord.Intents.default()
# The bot is intendend to see messages and members
intents.message_content = True
intents.members = True
bot = commands.Bot(intents=intents, command_prefix="/")


# Ready event
@bot.event
async def on_ready():
    for guild in bot.guilds:
        if guild.name == GUILD:
            break
    print(
        f"{bot.user} is connected to the following guild:\n"
        f"{guild.name}(id: {guild.id})"
    )


# Message event
@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    if message.content.startswith("Pung"):
        await message.channel.send("Hello!")
        # If Hedda
    if message.author.id == 522004874083172363:
        await message.add_reaction("<:opp:1305899202819391508>")
        # If Lidl
    if message.author.id == 226343548423766016:
        await message.add_reaction("<:Lidl:1305900704199606333>")
    await bot.process_commands(message)


# Count command
@bot.command(name="count")
async def count(ctx, arg):
    for i in range(int(arg)):
        if i + 1 == 34:
            await ctx.channel.send("<:34_an:1305515512578441256>")
        else:
            await ctx.channel.send(i + 1)
        time.sleep(0.1)


# Ska jag ha keps
@bot.command(name="skajaghakeps")
async def skajaghakeps(ctx):
    await ctx.channel.send(days_until_propellerkeps())


@bot.command(name="34")
async def thirtyfour(ctx, arg):
    out = ""
    for i in range(int(arg)):
        out += "<:34_an:1305515512578441256>"
    await ctx.channel.send(out)


status = False


@bot.command(name="start_counter")
async def counter(ctx):
    global status
    status = True
    while status:
        now = datetime.datetime.now().time()
        await ctx.channel.send(now)
        await asyncio.sleep(10)


@bot.command(name="stop_counter")
async def stop(ctx):
    global status
    status = False


bot.run(TOKEN)
