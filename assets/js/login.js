$(function(){
    //点击去注册账号的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })


    //点击去登录的链接
    $('#link_login').on('click', function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })


    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数自定义规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value){
        //通过形参拿到的是确认密码框中的内容
        //还需要拿到密码框中的内容
        var pwd = $('.reg-box [name=password]').val();
        if(pwd !== value) {
          return '两次密码不一致';
        }
        }
    })

    //监听注册的表单事件
    $('#form_reg').on('submit',function(e){
        //1.阻止默认的提交行为
        e.preventDefault();
        //2.发起Ajax的POST请求
        var data = { username:$('#form_reg [name=username]').val(),  password:$('#form_reg [name=password]').val()}
        $.post('http://ajax.frontend.itheima.net/api/reguser',data,function(res){
         if(res.status !== 0) {
             return layer.msg(res.message)
         }
           layer.msg('注册成功，请登录！')
           //模拟人的点击行为
           $('#link_login').click();
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            method:'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
             if(res.status !==0 ) {
                 return layer.msg('登录失败');
             }
             layer.msg('登录成功');
             //将登录成功的token保存到本地localStorage中
             localStorage.setItem('token', res.token);
             //跳转到首页
             location.href = 'index.html';
            }
        })
    })
})