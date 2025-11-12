const HistoryInfo=[
    {version: "2.2", info: "· Chasing 模块写完了喵！"},
    {version: "2.2", info: "· 将 Game 134 重修了一遍。<br>· 找到了之前的历史更新记录喵！"},
    {version: "2.1", info: "· 添加了历史记录栏。<br>· 将 博弈论 改名为 Game 134。"},
    {version: "2.0", info: "· 网站主页重写了一遍喵！"},
    {version: "1.6.7", info: "· 添加 Numble 模块。"},
    {version: "1.6.3", info: "· 将 自己做的解密 改名为 网站解谜。<br>· 在 网站解谜 中加入了 防跳关系统。"},
    {version: "1.6.2", info: "· 在 主页面 添加了背景图片，取代了之前的 随机颜色背景。"},
    {version: "1.6.1", info: "· 更改了 自己做的解密 板块中的副标题。"},
    {version: "1.6", info: "· 在 神奇迷宫验证码 中加入了个人记录！"},
    {version: "1.5", info: "· 添加 Update History 模块。"},
    {version: "1.4", info: "· 添加 网站优化 板块。"},
    {version: "1.3", info: "· 添加 博弈论 板块。"},
    {version: "1.2", info: "· 添加 自己做的解密 板块。"},
    {version: "1.1", info: "· 添加 神奇迷宫验证码 板块。"},
    {version: "1.0", info: "· 创建了这个网站的文件夹！"}
];

(()=>{
    $.loadHistory=()=>{
        const elem=document.querySelector(".history-content");
        for(let it of HistoryInfo)
        {
            let text=`
                <h5>${it.version}</h5>
                <hr style="margin: 5px 0">
                <p>${it.info}</p>
            `;
            elem.innerHTML+=text;
        }
        return;
    }
})();