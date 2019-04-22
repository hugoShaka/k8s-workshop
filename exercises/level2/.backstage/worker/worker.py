#!/usr/bin/env python
import time

from amqpstorm import Connection

connection = Connection('127.0.0.1', 'guest', 'guest')
channel = connection.channel()
channel.queue.declare(queue='hello')


while True:
    time.sleep(2)
    result = channel.basic.get(queue='hello', no_ack=False)
    if not result:
        print("Channel Empty.")
    else:
        print("Treating order", result.body)
        result.ack()
channel.close()
connection.close()

