<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

	<div class="form-group">
		<input id="userName" type="text" name="login" id="inputlogin" class="form-control"
			placeholder="Login..." required autofocus>
	</div>
	<div class="form-group">
		<input is="password" type="password" name="password" id="inputPassword"
			class="form-control" placeholder="Password..." autocomplete="off"
			required>
	</div>
	<button id="btn-connexion" class="form-control" type="submit"
		name="typeAction" value="connexion">Connexion</button>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</body>
</html>