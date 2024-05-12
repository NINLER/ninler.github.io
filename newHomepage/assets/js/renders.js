$.render=()=>{
    const shortcuts={
        h:'height',
        w:'width',
        mtop:'margin-top',
        mbottom:'margin-bottom',
        mleft:'margin-left',
        mright:'margin-right',
    };
    for(let i in shortcuts)
    {
        let temp=document.querySelectorAll(`*[${i}]`);
        for(let it=0; it<temp.length; it++)
            temp[it].style[shortcuts[i]]=temp[it].getAttribute(i)+'px';
    }
    return;
};