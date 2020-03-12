var router = require("koa-router")();
var Mock = require("mockjs");
const mock = Mock.mock;
var { checkToken } = require("../util/token");
router.prefix("/approval");
/**
 * 审核列表
 */
router.post("/list", async function(next) {
  console.log(this.request.body);
  await checkToken.call(this, () => {
    this.body = mock({
      "list|10": [
        {
          title: "张三的请假单",
          notifyDate: "2020-2-27 15:37",
          "leaveType|+1": ["事假", "申请"],
          startTime: "4-16 09:00",
          endTime: "4-1 18:00",
          "id|123.3": 1,
          status: "1",
          type: "leave" // 请假
        },
        {
          title: "李四的报销申请",
          notifyDate: "2020-2-27 15:37",
          "leaveType|+1": ["事假", "申请"],
          startTime: "4-16 09:00",
          endTime: "4-1 18:00",
          "id|123.3": 1,
          status: "-1",
          type: "reimbursement" // 报销
        },
        {
          title: "李四的费用申请",
          notifyDate: "2020-2-27 15:37",
          "leaveType|+1": ["事假", "申请"],
          startTime: "4-16 09:00",
          endTime: "4-1 18:00",
          "id|123.3": 1,
          status: "0",
          type: "expenses" // 费用
        },
        {
          title: "张三的出差单",
          notifyDate: "2020-2-27 15:37",
          "leaveType|+1": ["事假", "申请"],
          startTime: "4-16 09:00",
          endTime: "4-1 18:00",
          "id|123.3": 1,
          status: "0",
          type: "travel" // 出差
        },
        {
          title: "李四的外出申请",
          notifyDate: "2020-2-27 15:37",
          "leaveType|+1": ["事假", "申请"],
          startTime: "4-16 09:00",
          endTime: "4-1 18:00",
          "id|123.3": 1,
          status: "0",
          type: "out" // 外出
        }
      ],
      count: 10
    });
  });
});
/**
 * 审核详情
 */
router.post("/detail", async function() {
  checkToken.call(this, () => {
    const obj = this.request.body;
    if (!(obj && obj.id)) {
      this.status = 400;
      this.body = { errMsg: "id为必传" };
    } else {
      this.body = mock({
        title: "张三的请假申请",
        auditCode: "202002240001",
        submitTime: "2020/2/24 16:24",
        departmentName: "仓库",
        leaveTypeName: "事假",
        startTime: "04-16 09:00",
        endTime: "04-1618:00",
        leaveLength: "1",
        leaveReason: "无理由",
        accessoryExplain: "无说明",
        checkList: [
          {
            name: "老王",
            type: "已审核",
            isAudit: 1
          },
          {
            name: "张三",
            type: "已拒绝",
            isAudit: 0
          },
          {
            name: "张三",
            type: "未审核",
            isAudit: -1
          }
        ]
      });
    }
  });
});
/**
 * 修改审核状态
 */
router.put("/", function() {
  const body = this.request.body;
  this.body = { ...body };
});
module.exports = router;
