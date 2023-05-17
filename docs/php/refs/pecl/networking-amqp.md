# 其他服务 - AMQP

**介绍**

高级消息队列协议（AMQP）是一个异步消息传递所使用的应用层协议规范。作为线路层协议，而不是API（例如JMS），AMQP 客户端能够无视消息的来源任意发送和接受信息。现在，已经有相当一部分不同平台的服务器和客户端可以投入使用。

AMQP的原始用途只是为金融界提供一个可以彼此协作的消息协议，而现在的目标则是为通用消息队列架构提供通用构建工具。因此，面向消息的中间件 （MOM）系统，例如发布/订阅队列，没有作为基本元素实现。反而通过发送简化的AMQ实体，用户被赋予了构建例如这些实体的能力。这些实体也是规范的一 部分，形成了在线路层协议顶端的一个层级：AMQP模型。这个模型统一了消息模式，诸如之前提到的发布/订阅，队列，事务以及流数据，并且添加了额外的特 性，例如更易于扩展，基于内容的路由。

**安装**

这个扩展不支持windows, 因为 librabbitmq 库尚未支持 win 平台

**配置**

**函数**

AMQPConnection — The AMQPConnection class

> 1.AMQPConnection::connect — Establish a connection with the AMQP broker.
> 
> 
> 2.AMQPConnection::__construct — Create an instance of AMQPConnection
> 
> 3.AMQPConnection::disconnect — Closes the connection with the AMQP broker.
> 
> 4.AMQPConnection::getHost — Get the configured host
> 
> 5.AMQPConnection::getLogin — Get the configured login
> 
> 6.AMQPConnection::getPassword — Get the configured password
> 
> 7.AMQPConnection::getPort — Get the configured port
> 
> 8.AMQPConnection::getTimeout — Get the configured timeout
> 
> 9.AMQPConnection::getVhost — Get the configured vhost
> 
> 10.AMQPConnection::isConnected — Determine if the AMQPConnection object is connected to the broker.
> 
> 11.AMQPConnection::reconnect — Closes any open connection and creates a new connection with the AMQP broker.
> 
> 12.AMQPConnection::setHost — Set the amqp host.
> 
> 13.AMQPConnection::setLogin — Set the login.
> 
> 14.AMQPConnection::setPassword — Set the password.
> 
> 15.AMQPConnection::setPort — Set the port.
> 
> 16.AMQPConnection::setTimeout — Set the timeout.
> 
> 17.AMQPConnection::setVhost — Set the amqp virtual host
> 

AMQPChannel — The AMQPChannel class

> 1.AMQPChannel::commitTransaction — Commit a pending transaction
> 
> 
> 2.AMQPChannel::__construct — Create an instance of an AMQPChannel object
> 
> 3.AMQPChannel::isConnected — Check the channel connection
> 
> 4.AMQPChannel::qos — Set the Quality Of Service settings for the given channel
> 
> 5.AMQPChannel::rollbackTransaction — Rollback a transaction
> 
> 6.AMQPChannel::setPrefetchCount — Set the number of messages to prefetch from the broker
> 
> 7.AMQPChannel::setPrefetchSize — Set the window size to prefetch from the broker
> 
> 8.AMQPChannel::startTransaction — Start a transaction
> 

AMQPExchange — The AMQPExchange class

> 1.AMQPExchange::bind — Bind to another exchange
> 
> 
> 2.AMQPExchange::__construct — Create an instance of AMQPExchange
> 
> 3.AMQPExchange::declare — Declare a new exchange on the broker.
> 
> 4.AMQPExchange::delete — Delete the exchange from the broker.
> 
> 5.AMQPExchange::getArgument — Get the argument associated with the given key
> 
> 6.AMQPExchange::getArguments — Get all arguments set on the given exchange
> 
> 7.AMQPExchange::getFlags — Get the flag bitmask
> 
> 8.AMQPExchange::getName — Get the configured name
> 
> 9.AMQPExchange::getType — Get the configured type
> 
> 10.AMQPExchange::publish — Publish a message to an exchange.
> 
> 11.AMQPExchange::setArgument — Set the value for the given key
> 
> 12.AMQPExchange::setArguments — Set all arguments on the exchange
> 
> 13.AMQPExchange::setFlags — Set the flags on an exchange
> 
> 14.AMQPExchange::setName — Set the name of the exchange
> 
> 15.AMQPExchange::setType — Set the type of the exchange
> 

AMQPQueue — The AMQPQueue class

> 1.AMQPQueue::ack — Acknowledge the receipt of a message
> 
> 
> 2.AMQPQueue::bind — Bind the given queue to a routing key on an exchange.
> 
> 3.AMQPQueue::cancel — Cancel a queue binding.
> 
> 4.AMQPQueue::__construct — Create an instance of an AMQPQueue object
> 
> 5.AMQPQueue::consume — Consume messages from a queue
> 
> 6.AMQPQueue::declare — Declare a new queue
> 
> 7.AMQPQueue::delete — Delete a queue and its contents.
> 
> 8.AMQPQueue::get — Retrieve the next message from the queue.
> 
> 9.AMQPQueue::getArgument — Get the argument associated with the given key
> 
> 10.AMQPQueue::getArguments — Get all arguments set on the given queue
> 
> 11.AMQPQueue::getFlags — Get the flag bitmask
> 
> 12.AMQPQueue::getName — Get the configured name
> 
> 13.AMQPQueue::nack — Mark a message as explicitly not acknowledged.
> 
> 14.AMQPQueue::purge — Purge the contents of a queue
> 
> 15.AMQPQueue::setArgument — Set the value for the given key
> 
> 16.AMQPQueue::setArguments — Set all arguments on the queue
> 
> 17.AMQPQueue::setFlags — Set the queue flags
> 
> 18.AMQPQueue::setName — Set the queue name
> 
> 19.AMQPQueue::unbind — Unbind the queue from a routing key.
> 

AMQPEnvelope — The AMQPEnvelope class

> 1.AMQPEnvelope::getAppId — Get the message appid
> 
> 
> 2.AMQPEnvelope::getBody — Get the message body
> 
> 3.AMQPEnvelope::getContentEncoding — Get the message contentencoding
> 
> 4.AMQPEnvelope::getContentType — Get the message contenttype
> 
> 5.AMQPEnvelope::getCorrelationId — Get the message correlation id
> 
> 6.AMQPEnvelope::getDeliveryTag — Get the message delivery tag
> 
> 7.AMQPEnvelope::getExchange — Get the message exchange
> 
> 8.AMQPEnvelope::getExpiration — Get the message expiration
> 
> 9.AMQPEnvelope::getHeader — Get a specific message header
> 
> 10.AMQPEnvelope::getHeaders — Get the message headers
> 
> 11.AMQPEnvelope::getMessageId — Get the message id
> 
> 12.AMQPEnvelope::getPriority — Get the message priority
> 
> 13.AMQPEnvelope::getReplyTo — Get the message replyto
> 
> 14.AMQPEnvelope::getRoutingKey — Get the message routing key
> 
> 15.AMQPEnvelope::getTimeStamp — Get the message timestamp
> 
> 16.AMQPEnvelope::getType — Get the message type
> 
> 17.AMQPEnvelope::getUserId — Get the message user id
> 
> 18.AMQPEnvelope::isRedelivery — Whether this is a redelivery of the message
>