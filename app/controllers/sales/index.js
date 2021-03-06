const { Sale } = require("../../models");
const axios = require("axios");

const SNS = require("../../../app/utils/sns");
const { snsTopics } = require("../../../app/config/keys");

const sns = SNS({
  isOffline: false, // Only required for CLI testing, in app it will pick this automaticlally
});

const sqs = SNS({
  isOffline: false, // Only required for CLI testing, in app it will pick this automaticlally
  isSqs: true,
});

const all = async () => {
  try {
    const sales = await Sale.find({});
    return sales;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const findById = async (id) => {
  try {
    const sale = await Sale.findOne({ _id: id });
    return sale;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const remove = async (id) => {
  try {
    const sale = await Sale.deleteOne({ _id: id });
    return sale;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const update = async (id, body) => {
  try {
    const sale = await Sale.update({ _id: id }, body);

    console.log("Updated data:", sale);
    return sale;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const create = async (body) => {
  try {
    let sum = 0;
    for (var i = 0; i < body.items.length; i++) {
      sum = sum + Number(body.items[i].price);
    }

    let data = {
      email: body.customer.email,
      items: body.items,
      total: sum,
    };

    console.log("Sales data:", data);

    body = {
      ...body,
      method: "sale",
    };
    console.log("Body: ", body);

    const sale = await Sale.create(data);

    sns
      .publish({
        Message: JSON.stringify({
          body,
        }),
        Subject: "Order created",
        TopicArn: snsTopics.orderCreated,
      })
      .promise()
      .then((r) => console.log(r));

    sqs
      .sendMessage({
        MessageBody: JSON.stringify({
          to: "abdullah.tariq@shopdev.co",
          body: {
            text: "hello buddy",
            htmlData: [
              {
                A: "a",
                B: "b",
                C: "c",
              },
              {
                A: "a",
                B: "b",
                C: "c",
              },
            ],
          },
        }),
        QueueUrl: `https://sqs.us-east-1.amazonaws.com/${process.env.awsAccountId}/posifyEmailQueue`,
      })
      .promise()
      .then((r) => console.log(r));

    return sale;
  } catch (err) {
    console.log("Error: ", err);
    return err;
  }
};

module.exports = {
  all,
  create,
  findById,
  update,
  remove,
};
