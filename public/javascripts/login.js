$(() => {
    let signIn = $("#signIn");
    let login = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {

        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        let data = await login(inputEmail, inputPassword);
        if (data === 'success') {
            // var d = new Date();
            // Cookie.setCookie('username',inputEmail,d,'/');
            alert('登陆成功');
            location.href = '../dashboard.html';
        } else {
            alert('登陆失败，用户名或密码错误')
        }
    })
})