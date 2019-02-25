function Person(para1,para2)
{
    this.para1=para1;
    this.para2=para2;
}

Person.prototype.display=function()
{
    console.log("para1=",para1,"\npara2=",para2);
}
