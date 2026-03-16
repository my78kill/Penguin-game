import os
import threading
from flask import Flask
from telegram import InlineQueryResultGame
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, InlineQueryHandler

TOKEN = os.getenv("BOT_TOKEN")

GAME_SHORT_NAME = "penguin_runner"
GAME_URL = "https://your-game-url.onrender.com"

app = Flask(__name__)

@app.route("/")
def home():
    return "Penguin Game Bot Running"

def play(update, context):
    context.bot.send_game(
        chat_id=update.effective_chat.id,
        game_short_name=GAME_SHORT_NAME
    )

def button(update, context):
    query = update.callback_query

    context.bot.answer_callback_query(
        callback_query_id=query.id,
        url=GAME_URL
    )

def inline(update, context):
    query = update.inline_query

    results = [
        InlineQueryResultGame(
            id="1",
            game_short_name=GAME_SHORT_NAME
        )
    ]

    query.answer(results)

def run_bot():
    updater = Updater(TOKEN)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("play", play))
    dp.add_handler(CallbackQueryHandler(button))
    dp.add_handler(InlineQueryHandler(inline))

    updater.start_polling()
    updater.idle()

threading.Thread(target=run_bot).start()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
