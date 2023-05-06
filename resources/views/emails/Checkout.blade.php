<!DOCTYPE html>
<html>
<head>
	<title>Order Confirmation</title>
	<style type="text/css">
		body {
			font-family: Arial, sans-serif;
			font-size: 14px;
			color: #333;
			line-height: 1.5;
			background-color: #f7f7f7;
		}
		.container {
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			background-color: #fff;
			border: 1px solid #ccc;
		}
		h1 {
			font-size: 24px;
			margin: 0 0 20px;
		}
		p {
			margin: 0 0 10px;
		}
		table {
			border-collapse: collapse;
			width: 100%;
			margin-bottom: 20px;
		}
		table th {
			background-color: #f2f2f2;
			padding: 10px;
			text-align: left;
			border: 1px solid #ccc;
		}
		table td {
			padding: 10px;
			border: 1px solid #ccc;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Order Confirmation</h1>
		<p>Dear {{ $datalist['name'] }},</p>
		<p>Your order has been confirmed. Thank you for your purchase!</p>
		<table>
			<tr>
				<th>Product Name</th>
				<th>Quantity</th>
			</tr>
			<tr>
				<td>{{ $datalist['productName'] }}</td>
				<td>{{ $datalist['quantity'] }}</td>
			</tr>
		</table>
		<p>Here are the details of your order:</p>
		<p><strong>Name:</strong> {{ $datalist['name'] }}</p>
		<p><strong>Email:</strong> {{ $datalist['email'] }}</p>
		<p><strong>Street Address:</strong> {{ $datalist['streetAddress'] }}</p>
		<p>If you have any questions about your order, please don't hesitate to contact us.</p>
		<p>Thank you again for shopping with us!</p>
	</div>
</body>
</html>

