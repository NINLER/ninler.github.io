function mapInit()
{
    let ret=Array(200);
    for(let i=0; i<200; i++)
        ret[i]=Array(200);
    let str=`
00000000000000000
0M111111011111110
01000001010000010
01011111111111010
01010010001001010
01010011111001010
01011110101111010
01110100100101110
00010111P11101000
01110100100101110
01011110101111010
01010011111001010
01010010001001010
01011111111111010
01000001010000010
011111110111111M0
00000000000000000`;
    let temp=str.split('\n').splice(1);
    // console.log(temp);
    for(let i=0; i<temp.length; i++)
        for(let j=0; j<temp[i].length; j++)
            ret[i][j]=['0','1','M','P'].indexOf(temp[i][j]);
    return ret;
    /* Code : Block=0,0 Road=1,1 Monster=M,2 Player=P,3 */
}