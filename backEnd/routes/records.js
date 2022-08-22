const express = require('express');
const router = express.Router()
const Record = require('../models/record')

router.post("", ((req, res, next) => {
  const record = new Record({
    claimNumber: req.body.claimNumber,
    date: new Date(),
    status: req.body.status,
    processedBy: req.body.processedBy,
    assignment: req.body.assignment,
    client: req.body.client,
    exception: req.body.exception,
    exception2: req.body.exception2,
  })

  record.save().then(result => {
    res.status(201).json({
      message: 'Record added',
      record: {
        id: result._id,
        claimNumber: result.claimNumber,
        date: result.date,
        status: result.status,
        processedBy: result.processedBy,
        assignment: result.assignment,
        client: result.client,
        exception: result.exception,
        exception2: result.exception2,
      }
    })
  })
}))

router.get("", ((req, res, next) => {
  Record.find().then(records => {
    res.status(200).json({
      message: "Records fetched",
      records: records
    })
  })
}));

router.delete("/:id", ((req, res, next) => {
  Record.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: "Record Deleted"})
  })
}))

router.put("/:id", (req, res, next) => {
  const record = new Record({
    claimNumber: req.body.claimNumber,
    date: new Date(),
    status: req.body.status,
    processedBy: req.body.processedBy,
    assignment: req.body.assignment,
    client: req.body.client,
    exception: req.body.exception,
    exception2: req.body.exception2,
  });
  Record.updateOne({_id: req.params.id}, record).then(result => {
    res.status(200).json({message: "Update successful"})
  })
})

module.exports = router;
