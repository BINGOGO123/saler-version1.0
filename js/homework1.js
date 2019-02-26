const fixedData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]

var sourceData;

const DIVITEM="div-item";
const DIVREGION="div-region";
const DIVFORM="div-form";
const ITEMLIST=["手机","笔记本","智能音箱"];
const REGIONLIST=["华东","华南","华北"];
const CANVAS_WIDTH=500;
const CANVAS_HEIGHT=300;
var lastNode;

window.onload=function()
{
    // localStorage.clear();
    checkBox(DIVITEM,["全部","手机","笔记本","智能音箱"],1);
    checkBox(DIVREGION,["全部","华东","华南","华北"],1);

    if(!localStorage.getItem("sData"))
    {
        localStorage.setItem("sData",JSON.stringify(fixedData));
        sourceData=new Object();
        sourceData=Object.assign(fixedData);
    }
    else
        sourceData=JSON.parse(localStorage.getItem("sData"));
    // console.log("sourceData=",sourceData);

    let divItem=document.getElementById(DIVITEM);
    let divRegion=document.getElementById(DIVREGION);
    let divForm=document.getElementById(DIVFORM);
    let canvasRect=document.querySelector(".row-2 #canvas-rect");
    let canvasLine=document.querySelector(".row-2 #canvas-line");
    canvasRect.width=CANVAS_WIDTH;
    canvasRect.height=CANVAS_HEIGHT;
    canvasLine.width=CANVAS_WIDTH;
    canvasLine.height=CANVAS_HEIGHT;
    let rectCtx=canvasRect.getContext("2d");
    let lineCtx=canvasLine.getContext("2d");
    let rect=new CanvasPaint(rectCtx,CANVAS_WIDTH,CANVAS_HEIGHT);
    let line=new CanvasPaint(lineCtx,CANVAS_WIDTH,CANVAS_HEIGHT);

    divItem.onchange=changeOption;
    divRegion.onchange=changeOption;
    
    let checkBoxItemAll=divItem.querySelector("#全部");
    let checkBoxRegionAll=divRegion.querySelector("#全部");

    divItem.onclick=function(e)
    {
        selectAll(e,DIVITEM);
    }
    divRegion.onclick=function(e)
    {
        selectAll(e,DIVREGION);
    }
    window.onmouseover=function(e)
    {
        paintForm(e,rect,line);
    }
    divForm.onclick=function(e)
    {
        clickTd(e,rect,line);
    }
    window.onkeydown=function(e)
    {
        updateInput(e,rect,line);
    }
    // window.onhashchange=function(e)
    // {

    // }

    changeOption();
    paintAll(line);
}

function checkBox(id,arrayList,num)
{
    let div=document.querySelector("#"+id);
    for(let i in arrayList)
    {
        // console.log("arrayList[",i,"]=",arrayList[i]);
        let label=document.createElement("label");
        let radio=document.createElement("input");
        radio.type="checkbox";
        if(i==num)
            radio.checked=true;
        label.appendChild(radio);
        label.append(arrayList[i]);
        label.id=arrayList[i];
        div.append(label);
    }
}

function changeOption()
{
    let divItem=document.getElementById(DIVITEM);
    let divRegion=document.getElementById(DIVREGION);
    let divForm=document.getElementById(DIVFORM);

    let arrayItem=new Array();
    let arrayRegion=new Array();
    for(let i=0;i<divItem.children.length;i++)
    {
        // console.log(divItem.children[i].textContent);
        if(divItem.children[i].children[0].checked && isIn(divItem.children[i].textContent,ITEMLIST))
            arrayItem.push(divItem.children[i].textContent);
    }

    for(let i=0;i<divRegion.children.length;i++)
    {
        // console.log(divRegion.children[i].textContent);
        if(divRegion.children[i].children[0].checked && isIn(divRegion.children[i].textContent,REGIONLIST))
            arrayRegion.push(divRegion.children[i].textContent);
    }

    // console.log("arrayItem=",arrayItem);
    // console.log("arrayRegion=",arrayRegion);

    divForm.innerHTML="";
    let table=document.createElement("table");
    let thead=document.createElement("thead");
    let tbody=document.createElement("tbody");
    let row;
    let col;

    row=document.createElement("tr");
    col=document.createElement("th");
    col.rowSpan="2";
    col.textContent="商品";
    row.appendChild(col);
    col=document.createElement("th");
    col.rowSpan="2";
    col.textContent="地区";
    row.appendChild(col);
    col=document.createElement("th");
    col.textContent="销量";
    col.colSpan="12";
    row.appendChild(col);
    thead.appendChild(row);
    row=document.createElement("tr");

    for(let i=0;i<12;i++)
    {
        col=document.createElement("th");
        col.textContent=(i+1).toString()+"月";
        row.appendChild(col);
    }
    thead.appendChild(row);
    table.appendChild(thead);

    for(let i in arrayItem)
        for(let j in arrayRegion)
        {
            row=document.createElement("tr");
            row.className="normal";
            if(j==0)
            {
                col=document.createElement("th");
                col.textContent=arrayItem[i];
                col.rowSpan=arrayRegion.length.toString();
                row.appendChild(col);
            }
            col=document.createElement("th");
            col.textContent=arrayRegion[j];
            row.appendChild(col);

            let sale=findArray(arrayItem[i],arrayRegion[j]);
            if(sale===-1)
            {
                console.log(arrayItem[i]+" "+arrayRegion[j]+"遇到错误！");
                continue;
            }
            // console.log("sale=",sale);
            for(let k in sale)
            {
                col=document.createElement("td");
                col.textContent=sale[k].toString();
                row.appendChild(col);
            }
            tbody.appendChild(row);
        }
    table.appendChild(tbody);
    divForm.appendChild(table);
}

function isIn(elem,array)
{
    for(let i in array)
        if(elem===array[i])
            return true;
    return false;
}

function findArray(product,region)
{
    for(let i in sourceData)
    {
        if(sourceData[i].product===product && sourceData[i].region===region)
            return sourceData[i].sale;
    }
    return -1;
}

function selectAll(e,name)
{
    let div=document.getElementById(name);
    // console.log("e=",e);

    if(e.target.nodeName.toLowerCase()=="div")
        return;
    
    let thing=e.target;
    for(;thing.nodeName.toLowerCase()!="label";thing=thing.parentElement)
        if(thing.nodeName.toLowerCase()==div)
        {
            console.log("thing.nodeName.toLowerCase()==div","出现错误");
            return;
        }

    if(thing.id=="全部")
    {
        if(thing.children[0].checked)
        {
            for(let i=1;i<div.children.length;i++)
                div.children[i].children[0].checked=true;
        }
        else
        {
            for(let i=1;i<div.children.length;i++)
                div.children[i].children[0].checked=false;
        }
    }
    else
    {
        if(thing.children[0].checked)
        {
            let i=1;
            for(;i<div.children.length;i++)
                if(div.children[i].children[0].checked!=true)
                    break;
            if(i>=div.children.length)
                div.children[0].children[0].checked=true;
        }
        else
        {
            div.children[0].children[0].checked=false;
        }
    }
}

function paintForm(e,rect,line)
{
    if(e.target.nodeName.toLowerCase()!=="td")
    {
        if(lastNode!=undefined)
        {
            lastNode.className="normal";
            lastNode=undefined;
            paintAll(line);
        }
        return;
    }
    
    if(lastNode!=undefined)
        lastNode.className="normal";
    e.target.parentElement.className="mouse-over";
    lastNode=e.target.parentElement;

    let th1=e.target.parentElement.querySelector("th:nth-of-type(1)");
    let th2=e.target.parentElement.querySelector("th:nth-of-type(2)");
    if(th2===null)
    {
        th2=th1;
        let child=e.target.parentElement.parentElement.children;
        let i;
        for(i in child)
        {
            // console.log("child[i]=",child[i]);
            if(child[i]===e.target.parentElement)
                break;
        }
        th1=child[Math.floor(i/3)*3].querySelector("th:nth-of-type(1)");
    }
    // console.log(th1,th2);

    for(let i in sourceData)
    {
        if(sourceData[i].product===th1.textContent && sourceData[i].region===th2.textContent)
        {
            updateCanvas(sourceData[i].sale,rect,line);
            break;
        }
    }
}

function paintAll(line)
{
    line.clear("white");
    line.paintAxis(CANVAS_WIDTH,CANVAS_HEIGHT,"rgba(60,38,146,0.8)",4);

    let para=new Array();
    for(let i in sourceData)
    {
        para[i]=sourceData[i].sale;
    }
    line.paintAllLineChart(para);
}

function clickTd(e,rect,line)
{
    if(e.target.nodeName.toLowerCase()!=="td")
        return;

    let input=document.createElement("input");
    input.type="text";
    input.className="form-input"
    input.value=e.target.textContent;
    e.target.innerHTML="";
    e.target.appendChild(input);
    input.focus();
    input.onblur=function()
    {
        let child=input.parentElement.parentElement.parentElement.children;
        let root=input.parentElement.parentElement;
        let th1=root.querySelector("th:nth-of-type(1)");
        let th2=root.querySelector("th:nth-of-type(2)");
        let order;
        for(let i in root.children)
        {
            if(root.children[i]===input.parentElement)
                order=i-2;
        }

        if(th2===null)
        {
            th2=th1;
            let i;
            for(i in child)
            {
                // console.log("child[i]=",child[i]);
                if(child[i]===input.parentElement.parentElement)
                    break;
            }
            th1=child[Math.floor(i/3)*3].querySelector("th:nth-of-type(1)");
            order++;
        }

        for(let i in sourceData)
        {
            if(sourceData[i].product===th1.textContent&&sourceData[i].region===th2.textContent)
            {
                sourceData[i].sale[order]=Number(input.value);
                updateCanvas(sourceData[i].sale,rect,line);
            }
        }

        localStorage.setItem("sData",JSON.stringify(sourceData));
        let parent=input.parentElement;
        let value=input.value;
        parent.innerHTML=value;
    }
}

// Array.prototype.clone=function()
// {
//     let array=new Array();
//     for(let i in this)
//         array[i]=this[i];
//     return array;
// }

// function clone(array)
// {
//     let newArray=new Array();
//     for(let i in array)
//         newArray[i]=array[i];
//     console.log("newArray=",newArray);
//     return newArray;
// }

function updateCanvas(sale,rect,line)
{
    rect.clear("white");
    rect.paintAxis(CANVAS_WIDTH,CANVAS_HEIGHT,"rgba(60,38,146,0.8)",4);
    rect.paintRectChart(sale,"rgba(120,11,55,0.6)");
    line.clear("white");
    line.paintAxis(CANVAS_WIDTH,CANVAS_HEIGHT,"rgba(60,38,146,0.8)",4);
    line.paintLineChart(sale,"rgba(120,11,55,0.6)",3);
}

function updateInput(e,rect,line)
{
    // console.log("e.key=",e.key);
    // console.log("typeof e.key=",typeof e.key);
    if(e.key!=="Enter")
        return;
    // console.log("document.activeElement.nodeName.toLowerCase()=",document.activeElement.nodeName.toLowerCase());
    if(document.activeElement.nodeName.toLowerCase()=="input")
        // document.activeElement.onblur();
    {
        let input=document.activeElement;
        let child=input.parentElement.parentElement.parentElement.children;
        let root=input.parentElement.parentElement;
        let th1=root.querySelector("th:nth-of-type(1)");
        let th2=root.querySelector("th:nth-of-type(2)");
        let order;
        for(let i in root.children)
        {
            if(root.children[i]===input.parentElement)
                order=i-2;
        }

        if(th2===null)
        {
            th2=th1;
            let i;
            for(i in child)
            {
                // console.log("child[i]=",child[i]);
                if(child[i]===input.parentElement.parentElement)
                    break;
            }
            th1=child[Math.floor(i/3)*3].querySelector("th:nth-of-type(1)");
            order++;
        }

        for(let i in sourceData)
        {
            if(sourceData[i].product===th1.textContent&&sourceData[i].region===th2.textContent)
            {
                sourceData[i].sale[order]=Number(input.value);
                updateCanvas(sourceData[i].sale,rect,line);
            }
        }

        localStorage.setItem("sData",JSON.stringify(sourceData));
        let parent=input.parentElement;
        let value=input.value;
        parent.append(value);
        input.innerHTML="";
        input.style.display="none";
    }
}