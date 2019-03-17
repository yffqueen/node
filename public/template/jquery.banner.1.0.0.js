;(function($){
    "use strict";

    $.extend($.fn,{
        banner:function(options){
            
            this.LOCAL = {
               
                autoPlay : options.autoPlay === false ? false : true,
                delayTime : options.delayTime || 3000,
                moveTime : options.moveTime || 300,
               
                index : 0,   
                iPrev : options.items.length-1,  

               
                listOnoff:false,
            };

            var that = this;
            
            if(options.list != undefined && options.list.length > 0){
						
                options.list.eq(0).css("background","red")

               
                this.LOCAL.listOnoff = true;

               
                this.LOCAL.listMove = function(i,type){
                   
                    options.items
                  
                    .eq(that.LOCAL.index)
                   
                    .css({left:0})
                   
                    .stop().animate({
                     
                        left:-options.items.eq(0).width() * type
                    },that.LOCAL.moveTime)
                   
                    .end()
                    
                    .eq(i)
                    
                    .css({left:options.items.eq(0).width() * type})
                   
                    .stop().animate({
                      
                        left:0
                    },that.LOCAL.moveTime)
                }
               
                options.list.on("click",function(){
                   
                    if(that.LOCAL.index < $(this).index()){
                        that.LOCAL.listMove($(this).index(),1)
                    }
                    
                    if(that.LOCAL.index > $(this).index()){
                        that.LOCAL.listMove($(this).index(),-1)
                    }
                    
                    that.LOCAL.index = $(this).index();

                    
                    options.list.css("background","none").eq(that.LOCAL.index).css("background","red")
                })
            }
            this.LOCAL.rightclick = function(){
               
                if(that.LOCAL.index == options.items.length-1){
                    that.LOCAL.index = 0;
                    that.LOCAL.iPrev = options.items.length - 1;
                }else{
                    that.LOCAL.index++;
                    that.LOCAL.iPrev = that.LOCAL.index - 1;
                }
               
                that.LOCAL.btnMove(-1)
            }
            this.LOCAL.btnMove = function(type){
               
                options.items.eq(that.LOCAL.iPrev).css({
                    left:0
                }).stop().animate({
                    left:options.items.eq(0).width() * type
                },that.LOCAL.moveTime).end().eq(that.LOCAL.index).css({
                    left:-options.items.eq(0).width() * type
                }).stop().animate({
                    left:0
                },that.LOCAL.moveTime)

               
                if(that.LOCAL.listOnoff){
                    options.list.css("background","none").eq(that.LOCAL.index).css("background","red")
                }
            }
          
            if(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0){
             
                options.left.on("click",function(){
                  
                    if(that.LOCAL.index == 0){
                        that.LOCAL.index = options.items.length-1;
                        that.LOCAL.iPrev = 0;
                    }else{
                        that.LOCAL.index--;
                        that.LOCAL.iPrev = that.LOCAL.index + 1
                    }
                    
                    that.LOCAL.btnMove(1)
                })
           
                options.right.on("click",this.LOCAL.rightclick)
            }

            
            if(this.LOCAL.autoPlay){
                
                this.LOCAL.timer = setInterval(this.LOCAL.rightclick, this.LOCAL.delayTime);

               
                this.hover(function(){
                    
                    clearInterval(that.LOCAL.timer)
                },function(){
                    that.LOCAL.timer = setInterval(that.LOCAL.rightclick, that.LOCAL.delayTime);
                })
            }

        }
    })

})(jQuery);