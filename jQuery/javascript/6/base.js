﻿

//前台调用
var $=function(_this){
   return new Base(_this);
}

//基础库
function Base(_this){

     //创建一个数组，来保存获取的节点和节点数组
     this.elements=[];
	 if(_this!=undefined){             //_this是一个对象,undefined也是一个对象，区别于typeof带带引号的‘undefined’
	     this.elements[0]=_this;
	 }
}


  
  
  //获取ID节点
  Base.prototype.getId=function(id){
     this.elements.push(document.getElementById(id));
     return this;
  };
  
  //获取元素节点
  Base.prototype.getTagName=function(tag){
     var tags=document.getElementsByTagName(tag);
	 for(var i=0;i<tags.length;i++){
	    this.elements.push(tags[i]);
	 }
     return this;
  };
  
//获取CLASS节点数组
Base.prototype.getClass=function(className,idName){
   var node=null;
   if(arguments.length==2){
      node=document.getElementById(idName);
   }else{
      node=document;
   }
   var all=node.getElementsByTagName('*');
   for(var i=0;i<all.length;i++){
       if(all[i].className==className){
	       this.elements.push(all[i]);
	   }
   }
   return this;
}

//获取摸一个节点
Base.prototype.getElement=function(num){
    var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
};

//设置css
Base.prototype.css=function(attr,value){
     for(var i=0;i<this.elements.length;i++){
	    if(arguments.length==1){
		   if(typeof window.getComputedStyle!='undefined'){                //W3C   获取外部css样式
		         return window.getComputedStyle(this.elements[i],null)[attr];
		   }else if(typeof this.elements[i].currentStyle!='undefined'){    //IE
		         return this.elements[i].currentStyle[attr];
		   }
		   
		}
	    this.elements[i].style[attr]=value;
	 }
	 return this;
};

//添加Class
Base.prototype.addClass=function(className){
    for(var i=0;i<this.elements.length;i++){
	   if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
	     this.elements[i].className+=' '+className;
	   }
	   
	}
	return this;
}


//移除Class
Base.prototype.removeClass=function(className){
    for(var i=0;i<this.elements.length;i++){
	   if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
	      this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),''); 
	   }
	   
	}
	return this;
}

//添加link或style的css规则
Base.prototype.addRule=function(num,selectorText,cssText,position){    //第一个num表示第几个link或style标签
    var sheet=document.styleSheets[num];
	if(typeof sheet.insertRule!='undefined'){           //W3C
	    sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule!='undefined'){
	    sheet.addRule(selectorText,cssText,position);       //IE
	}
	return this;
}


//移除link或style的css规则
Base.prototype.removeRule=function(num,index){
    var sheet=document.styleSheets[num];
	if(typeof sheet.deleteRule!='undefined'){   //W3C
	    sheet.deleteRule(index);
	}else if(typeof sheet.removeRule!='undefined'){  //IE
	   sheet.removeRule(index);
	}
	return this;
}

//设置innerHTML
Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
	   if(arguments.length==0){
	       return this.elements[i].innerHTML;
	   }
	    this.elements[i].innerHTML=str;
	 }
	 return this;
};


//添加鼠标移入移除方法
Base.prototype.hover=function(over,out){
    for(var i=0;i<this.elements.length;i++){
	    this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	}
	return this;
}

//设置显示
Base.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
	   this.elements[i].style.display='block';
	}
	return this;
}

//设置隐藏
Base.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
	   this.elements[i].style.display='none';
	}
	return this;
}

//设置物体居中
Base.prototype.center=function(width,height){
     var top=(document.documentElement.clientHeight-height)/2;
     var left=(document.documentElement.clientWidth-width)/2;
	 for(var i=0;i<this.elements.length;i++){
	     this.elements[i].style.top=top+'px';
		 this.elements[i].style.left=left+'px';
	 }
	 return this;
}

//触发点击事件
Base.prototype.click=function(fn){
       for(var i=0;i<this.elements.length;i++){
	    this.elements[i].onclick=fn;
	 }
	 return this;
};

//触发浏览器窗口事件
Base.prototype.resize=function(fn){
    window.onresize=fn;
	return this;
}



