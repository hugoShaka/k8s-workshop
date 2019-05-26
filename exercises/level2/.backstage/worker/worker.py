#!/usr/bin/env python
import time

from amqpstorm import Connection

connection = Connection('rabbitmq', 'guest', 'guest')
channel = connection.channel()
channel.queue.declare(queue='customer_orders')


while True:
    time.sleep(2)
    result = channel.basic.get(queue='customer_orders', no_ack=False)
    if not result:
        print("Channel Empty.")
    else:
        print("Treating order", result.body)
        result.ack()
channel.close()
connection.close()

