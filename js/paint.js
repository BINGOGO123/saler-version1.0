function CanvasPaint(ctx,width,height)
{
    this.ctx=ctx;
    this.width=width;
    this.height=height;

    this.ctx.translate(0,this.height);
    this.ctx.scale(1,-1);
    // this.ctx.rotate(degree(360));
}

CanvasPaint.prototype.clear=function(color)
{
    if(color===undefined)
        color="white";
    this.ctx.fillStyle=color;
    this.ctx.fillRect(0,0,this.width,this.height);
}

CanvasPaint.prototype.paintAxis=function(wd,ht,color,line)
{
    if(wd===undefined||wd>this.width)
        wd=this.width;
    if(ht===undefined||ht>this.ht)
        ht=this.height;
    if(color===undefined)
        color="black";
    if(line==undefined)
        line="1";
    
    this.ctx.beginPath();
    this.ctx.strokeStyle=color;
    this.ctx.lineWidth=line;
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(this.width,0);
    this.ctx.moveTo(0,0);
    this.ctx.lineTo(0,this.height);
    this.ctx.stroke();
}

CanvasPaint.prototype.paintRectChart=function(array,color)
{
    if(array===undefined)
    {
        console.log("请传入array参数！");
        return;
    }
    if(color===undefined)
        color="black";
    
    // console.log(array);

    let maxHeight=max(array);
    let xWidth=this.width/array.length;
    let padding=xWidth*0.05;
    let clearWidth=xWidth*0.9;

    this.ctx.fillStyle=color;
    for(let i in array)
    {
        // console.log(i*xWidth+padding,0,clearWidth,array[i]/maxHeight*this.height);
        this.ctx.fillRect(i*xWidth+padding,0,clearWidth,array[i]/maxHeight*this.height);
    }
}

CanvasPaint.prototype.paintLineChart=function(array,color,line,forceHeight)
{
    if(array===undefined)
    {
        console.log("请传入array参数！");
        return;
    }
    if(color===undefined)
        color="black";
    if(line===undefined)
        line="1";
    
    let maxHeight;
    if(forceHeight===undefined)
        maxHeight=max(array);
    else
        maxHeight=forceHeight;
    let xWidth=this.width/(array.length+1);

    this.ctx.strokeStyle=color;
    this.ctx.lineWidth=line;
    this.ctx.beginPath();
    for(var i in array)
    {
        if(i==0)
            this.ctx.moveTo(xWidth/2,array[i]/maxHeight*this.height);
        else
            this.ctx.lineTo(xWidth/2+i*xWidth,array[i]/maxHeight*this.height);
    }
    this.ctx.stroke();
}

CanvasPaint.prototype.paintAllLineChart=function(array)
{
    if(array.length<=0)
    {
        console.log("请至少传入一个数组");
        return;
    }
    let maxHeight=max(array[0]);
    for(let i in array)
    {
        if(i!==0)
        {
            maxHeight=Math.max(maxHeight,max(array[i]));
        }
    }
    // if(maxHeight>this.height)
    //     maxHeight=this.height;

    for(let i in array)
    {
        this.paintLineChart(array[i],randomColor(),"3",maxHeight);
    }
}