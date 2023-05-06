<!DOCTYPE html>
<html>
<head>
    <title>New contact message</title>
</head>
<body>
    <h1>New contact message:</h1>
    <p><strong>Name:</strong> {{ $datalist['name'] }}</p>
    <p><strong>Last Name:</strong> {{ $datalist['Lname'] }}</p>
    <p><strong>Email:</strong> {{ $datalist['email'] }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ $datalist['message']}}</p>
</body>
</html>
