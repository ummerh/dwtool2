<html lang="en">
<%@include file="./include/head.jsp"%>
<script>
    var givenName = '${USER_GIVEN_NAME}';
    var jwtToken = '${JWT_TOKEN}';
</script>

<body>
    <div class="container-fluid">
        <h1>Error Page</h1>
        <table>
            <tr>
                <td>Date</td>
                <td>${timestamp}</td>
            </tr>
            <tr>
                <td>Error</td>
                <td>${error}</td>
            </tr>
            <tr>
                <td>Status</td>
                <td>${status}</td>
            </tr>
            <tr>
                <td>Message</td>
                <td>${message}</td>
            </tr>
            <tr>
                <td>Exception</td>
                <td>${exception}</td>
            </tr>
            <tr>
                <td>Trace</td>
                <td>
                    <pre>${trace}</pre>
                </td>
            </tr>
        </table>
    </div>
    <%@include file="./include/scripts.jsp"%>
</body>

</html>