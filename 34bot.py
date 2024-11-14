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
    await bot.tree.sync()
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


@bot.tree.command(
    name="count", description="Skriv hur högt du vill att boten ska räkna"
)
async def count(ctx, arg: int = 34):
    for i in range(int(arg)):
        if i + 1 == 34:
            await ctx.channel.send("<:34_an:1305515512578441256>")
        else:
            await ctx.channel.send(i + 1)
        time.sleep(0.1)


# Ska jag ha keps
@bot.tree.command(name="skajaghakeps", description="Ska jag ha keps idag?")
async def skajaghakeps(ctx):
    await ctx.response.send_message(days_until_propellerkeps())


@bot.tree.command(name="34", description="Skriv så många 34 du vill ha")
async def thirtyfour(ctx, arg: int = 34):
    out = ""
    for i in range(int(arg)):
        out += "<:34_an:1305515512578441256>"
    await ctx.channel.send(out)


sittning_status = False


# Start sittning
@bot.tree.command(name="start_sittning", description="Sätter boten i sittningsläge")
async def start_sittning(ctx):
    global sittning_status
    sittning_status = True
    while sittning_status:
        minute = datetime.datetime.now().minute
        time_until_24 = (24 - minute) % 60
        hour = datetime.datetime.now().hour
        if time_until_24 > 24:
            hour = hour + 1
        hour = str(hour)
        if len(hour) == 1:
            hour = "0" + hour
        # Sov tills klockan är 24
        await asyncio.sleep(time_until_24 * 60)
        # Skicka bara om sittning fortfarande är på
        if sittning_status:
            await ctx.channel.send("@everyone KLOCKAN ÄR 24")
        # Sov i 9 min
        await asyncio.sleep(9 * 60)
        if sittning_status:
            await ctx.channel.send("Klockan är 33")


# Stoppa sittning
@bot.tree.command(name="stop_sittning", description="Tar boten ur sittningsläge")
async def stop_sittning(ctx):
    global sittning_status
    sittning_status = False


bot.run(TOKEN)
