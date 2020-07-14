/**
 * author: Hans
 * date: 2020/6/5
 */


//提交表单
$('#submitForm').click(function (e) {
    //阻止默认提交
    e.preventDefault();
    //表单序列化，得到数组
    let data = $("form").serializeArray();
    let obj = {}
    for (let i of data) {
        if (["className", "studentId", "studentName"].includes(i.name)) {
            continue;
        }
        obj[i.name] ? obj[i.name] += i.value : obj[i.name] = i.value
    }
    let score = calculateScore(obj);
    console.log("当前分数为：" + score);
    showTestResult(obj, testCorrectAnswerList, score);
})

// 计算分数
function calculateScore(data) {
    let score = 0;
    if (data["5-1"] !== "") {
        score = 20;
    }
    for (let i in testCorrectAnswerList) {
        if (testCorrectAnswerList[i].value === data[i]) {
            score += testCorrectAnswerList[i].score
        }
    }
    return score;
}

// 展示测试结果
function showTestResult(yourAnswer, correctAnswer, score) {
    $("#result").empty();
    let tbody = "";
    for (let i in correctAnswer) {
        tbody += `<tr>
            <td>${i}</td>
            <td>${yourAnswer[i] ? yourAnswer[i] : ""}</td>
            <td>${correctAnswer[i].value}</td>
            <td>${correctAnswer[i].value !== "开放题型" ? (yourAnswer[i] === correctAnswer[i].value ? correctAnswer[i].score : 0) : (yourAnswer[i] !== "" ? testCorrectAnswerList[i].score : 0)}</td>
        </tr>`
    }
    let dom = `<div style="color: red">Score:${score}</div>
        <button onclick="window.location.reload()">Try again</button>
        <table border="1">
            <thead>
                <th>Title</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
                <th>Score</th>
            </thead>
            <tbody>${tbody}</tbody>
        <table>`;
    $("#result").append(dom);
}