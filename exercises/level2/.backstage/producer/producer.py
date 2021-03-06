#!/usr/bin/env python
import pika
import time
import uuid

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq'))
channel = connection.channel()

channel.queue_declare(queue='customer_orders')

while True:
    id = uuid.uuid4()
    channel.basic_publish(exchange='', routing_key='customer_orders', body=f'Order {id}')
    print(f"Produced order {id}")
    time.sleep(1)
connection.close()
