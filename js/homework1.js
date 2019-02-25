const sourceData = [{
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

const DIVITEM="div-item";
const DIVREGION="div-region";
const DIVFORM="div-form";
const ITEMLIST=["手机","笔记本","智能音箱"];
const REGIONLIST=["华东","华南","华北"];

window.onload=function()
{
    checkBox(DIVITEM,["全部","手机","笔记本","智能音箱"],1);
    checkBox(DIVREGION,["全部","华东","华南","华北"],1);

    let divItem=document.getElementById(DIVITEM);
    let divRegion=document.getElementById(DIVREGION);

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

    changeOption();
}

function checkBox(id,arrayList,num)
{
    let div=document.querySelector("#"+id);
    for(let i in arrayList)
    {
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