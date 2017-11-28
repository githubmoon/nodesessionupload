$("#btn").click(function(){
    var named =$('#uname').val();
    var passd =$('#upassd').val();
    if(named == '' || passd == ''){
        $("#show").html("请输入用户名和密码！！！");
        setTimeout(function(){
            $("#show").html("");
        },1000)
        return;
    }
    // $.ajax({
    //     type:'post',
    //     url:'/main',
    //     data:{nameds:named,passds:passd},
    //     success:function(data){console.log(data);
    //         var tipsname ="没有此用户，请注册！！！",tipspassd="密码错误！！！",users=0;
    //         data = data.split('spt').slice(0, length - 1);
    //
    //         for(var i=0;i<data.length;i++){
    //
    //             var cbn = data[i].split(',').slice(0,length-1);
    //
    //             if(named == cbn[0]){
    //                 if(passd == cbn[1]){
    //                     window.location.href = "DB/htm/ajaxJQ.asp"
    //                     return;
    //                 }else{
    //                     users=1;
    //                 }
    //             }
    //
    //
    //         }
    //
    //         if(users){
    //             $("#show").html(tipspassd);
    //             setTimeout(function(){
    //                 $("#show").html("");
    //             },1000)
    //         }else{
    //             $("#show").html(tipsname);
    //             setTimeout(function(){
    //                 $("#show").html("");
    //             },1000)
    //         }
    //
    //     },
    //     error:function(err){
    //         console.log(err);
    //     }
    // });
});