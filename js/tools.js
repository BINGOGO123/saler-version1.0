function degree(num)
{
    return num/180*Math.PI;
}

function max(array)
{
    let maxNum;
    maxNum=array[0];
    for(let i in array)
    {
        if(array[i]>maxNum)
            maxNum=array[i];
    }
    return maxNum;
}

function random(a,b)
{
    return Math.round(Math.random()*(b-a)+a);
}

function randomColor()
{
    return "rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+","+Math.random()+")";
}