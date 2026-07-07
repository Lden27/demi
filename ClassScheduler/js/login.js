const encoded =
"W3sidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiMTIzIiwicm9sZSI6ImFkbWluIn0seyJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIxMTEiLCJyb2xlIjoidXNlciJ9XQ==";

const accounts =
JSON.parse(atob(encoded));

function goToRegister(){

    window.location.href = "register.html";

}

function login(){

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    let account = accounts.find(acc =>

        acc.username === username &&
        acc.password === password

    );

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let registeredUser = users.find(user =>

        user.username === username &&
        user.password === password

    );

    if(account || registeredUser){

        localStorage.setItem("isLogin", "true");

        // admin
        if(account && account.role === "admin"){

            localStorage.setItem("role", "admin");

            window.location.href = "admin.html";

        }

        else{

            localStorage.setItem("role", "user");

            window.location.href = "index.html";

        }

    }
    else{

        document.getElementById("error").innerText =
            "Sai tài khoản hoặc mật khẩu";

    }
}
