<%
set conn=Server.CreateObject("ADODB.Connection")
conn.Open "driver={SQL Server};server=ms4932640.xincache1.cn;uid=ms4932640;pwd=z5J7a9r8;database=ms4932640"

set rs=Server.CreateObject("ADODB.recordset")
rs.open"select * from guest.photos" ,conn
    do While not rs.eof
    Response.write(rs(0)&",")
    rs.MoveNext
Loop
rs.close()
Conn.close()
%>
