<html lang="en">
<%@include file="./include/head.jsp"%>
<script>
	var givenName = '${USER_GIVEN_NAME}';
	var jwtToken = '${JWT_TOKEN}';
</script>
<body>
	<div class="container-fluid">
		<div id="homeContent"></div>
	</div>
	<%@include file="./include/scripts.jsp"%>
</body>
</html>