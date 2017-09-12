//图片预加载插件

(function($){

  function Preload(imgs, option){
      this.imgs = (typeof imgs === 'string')? [imgs] : imgs;
      this.opts = $.extend({}, Preload.DEFAULTS, option);//自定义对象参数与默认对象参数整合

      if(this.oreder == 'oredered'){//转为有序加载
        this._oredered();
      }else{
        this._unoredered();
      }
  }
  Preload.DEFAULTS = {
    order: '_unoredered',//默认是无序加载
    each:null, //每一张图片加载完毕后执行
    all:null //所有图片加载完毕后执行
  };
  Preload.prototype._oredered = function (){
      load();
      function load(){
        var imgObj = new Image();

        $(imgObj).on("load erorr" , function(){
          opts.each && opts.each(count);
            if(count >=  len){
              opts.all && opts.all(count);
              //图片已加载完毕
            }else{
              load();
            }
            count++;
        })
      }
  }
  Preload.prototype._unoredered = function (){//无序加载
    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len = imgs.length;

    $.each(imgs, function(i, src){
      if(typeof src != 'string') return;

      var imgObj = new Image();
      $(imgObj).on("load error", function(){
        opts.each && opts.each(count);
        if(count >= len - 1){
          opts.all && opts.all();
        }
        count++;
      });
      imgObj.src = src;
    });
  };

  $.extend({
    preload: function (imgs, opts) {
      new Preload(imgs, opts);
    }
  });
})(jQuery);
