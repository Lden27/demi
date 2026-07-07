function register(){

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let existed =
        users.find(user => user.username === username);

    if(existed){

        document.getElementById("message").innerHTML =
            "<span class='text-danger'>Tài khoản đã tồn tại</span>";

        return;
    }

    let newUser = {

        username: username,
        password: password,
        role: "user"

    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").innerHTML =
        "<span class='text-success'>Đăng ký thành công</span>";
}