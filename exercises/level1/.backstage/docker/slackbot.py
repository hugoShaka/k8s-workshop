import os
import time
import logging
import slack


def main():
    """Main loop"""
    log = logging.getLogger("slackbot")

    log.setLevel(logging.DEBUG)
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.INFO)
    log.addHandler(stream_handler)

    slack_token = os.getenv("WORKSHOP_SLACK_TOKEN")
    slack_channel = os.getenv("WORKSHOP_SLACK_CHANNEL")
    username = os.getenv("WORKSHOP_YOUR_NAME")
    answer = int(
        os.getenv("ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING")
    )

    if slack_token is None:
        raise Exception("WORKSHOP_SLACK_TOKEN not defined")
    if slack_channel is None:
        raise Exception("WORKSHOP_SLACK_CHANNEL not defined")
    if username is None:
        raise Exception("WORKSHOP_YOUR_NAME not defined")
    if answer is None:
        raise Exception(
            "ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING not defined"
        )

    time.sleep(1)

    success = False
    while True:
        if answer != 42:
            log.error(
                "Wrong Answer to the Ultimate Question of Life, The Universe, and Everything was given."
            )
            log.error(f"Answer is not {answer}")
        elif not success:
            log.info("Good answer, going to say this on slack !")
            client = slack.WebClient(slack_token)
            client.chat_postMessage(
                channel=slack_channel,
                text=f"Congrats {username} for finishing level 1 :tada:",
            )
            success = True
        else:
            log.info("Already good answer, nothing to do")

        time.sleep(10)


if __name__ == "__main__":
    main()
