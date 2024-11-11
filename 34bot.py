# 34bot.py

import os
import time
import discord
from discord.ext import commands
from dotenv import load_dotenv
from DagarTillPropellerkeps import days_until_propellerkeps

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
GUILD = os.getenv("DISCORD_GUILD")
intents = discord.Intents.default()
intents.message_content = True
intents.members = True
# client = discord.Client(intents=intents)
bot = commands.Bot(intents=intents, command_prefix="/")


@bot.event
async def on_ready():
    for guild in bot.guilds:
        if guild.name == GUILD:
            break

    print(
        f"{bot.user} is connected to the following guild:\n"
        f"{guild.name}(id: {guild.id})"
    )
    for member in guild.members:
        print(member)


@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    if message.content.startswith("Pung"):
        await message.channel.send("Hello!")
    if message.author.id == 522004874083172363:
        await message.reply("Opp")
    await bot.process_commands(message)


@bot.command(name="count")
async def nine_nine(ctx, arg):
    for i in range(int(arg)):
        if i + 1 == 34:
            await ctx.channel.send("<:34_an:1305515512578441256>")
        else:
            await ctx.channel.send(i + 1)
        time.sleep(0.1)

@bot.command(name="count")
async def nine_nine(ctx):
    await ctx.channel.send(days_until_propellerkeps())


@bot.command(name="34")
async def thirtyfour(ctx, arg):
    out = ""
    for i in range(int(arg)):
        out += "<:34_an:1305515512578441256>"
    await ctx.channel.send(out)


bot.run(TOKEN)
