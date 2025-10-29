const HistoryInfo=[
    {version: "2.1", info: "· 将 Game 134 重修了一遍。"},
    {version: "2.0", info: "· 添加了历史记录栏。"},
    {version: "1.0", info: "· 创建了这个网站的文件夹！<br>· 1.0 的其他更新记录消失了喵！"}
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