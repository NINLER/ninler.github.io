var BetterSSLOJTempermonkeyCode='var id;\nvar tempTimeout;\nfunction work()\n{\n    let temp1=document.getElementsByClassName("font-content");\n    let example=temp1[3].firstChild;\n    let children=example.children;\n    let size=example.childElementCount;\n    console.log(children[1].firstChild.firstChild.firstChild.innerText);\n    console.log(size);\n    let added="";\n    // example.innerHTML="";\n    for(let i=1; i<=size/2; i++)\n    {\n        added+=\'<p>\'+children[i*2-2].innerHTML+\'</p>\';\n        // Button\n        added+=\'<button id="copy\'+i+\'" onclick="copy(\'+i+\')" style="height:20pt;font-family:consolas;background-color:#000000;color:#38bfff;width:auto;border-radius:10pt;text-ailgn:center;">Copy Text</button>\'\n        added+=\'<div id="text\'+i+\'"class="ui existing segment">\'+children[i*2-1].innerHTML+\'</div>\';\n    }\n    example.innerHTML=added;\n    return;\n}\nwork();\nfunction copy(i)\n{\n    // console.log("try to copy para."+i);\n    id="copy"+i;\n    // console.log(btn);\n    const input=document.createElement(\'textarea\');\n    let text=document.getElementById(\'text\'+i).firstChild.firstChild.firstChild.innerText;\n    input.value=text;\n    document.body.appendChild(input);\n    input.select();\n    document.execCommand(\'copy\');\n    document.body.removeChild(input);\n    document.getElementById(id).innerText="Successfully";\n    document.getElementById(id).style.color="lightgreen";\n    setTimeout(\'tempTimeout=document.getElementById(id);tempTimeout.innerText="Copy Text";tempTimeout.style.color="#38bfff";\',1000);\n    // console.log("Copy Successfully.");\n    return;\n}\n'
