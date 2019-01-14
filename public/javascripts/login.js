$(() => {
    let fn = {
        signIn: async () => {
            let signIn = $("#signIn");

            let login = (inputEmail, inputPassword) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        url: "http://39.105.167.17:3000/users/login",
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
                if (data.status === 'success') {
                    // var d = new Date();
                    // Cookie.setCookie('username',inputEmail,d,'/');
                    localStorage.setItem("token", data.token);
                    alert('登陆成功');
                    location.href = '../dashboard.html';
                } else {
                    alert('登陆失败，用户名或密码错误')
                }
            })
        }
    }

    
    fn.signIn();

})