<!DOCTYPE html>
<html>

<head>
    <title>Bill Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        h2 {
            color: #333;
        }

        .bill-info {
            margin-bottom: 20px;
        }

        .bill-info p {
            margin: 5px 0;
        }

        .total {
            font-weight: bold;
            margin-top: 20px;
        }
        #container{
            display: flex;
            margin: 50px auto;
            flex-direction: column;
        }
    </style>
</head>

<body>
    <div id="container">
        <h2>Bill Information</h2>
        <div class="bill-info">
            <p><strong>Name:</strong> {{ $datalist['name'] }}</p>
            <p><strong>Email:</strong> {{ $datalist['email'] }}</p>
            <p><strong>Street Address:</strong> {{ $datalist['streetAddress'] }}</p>
            <p><strong>Product Name:</strong> {{ $datalist['productName'] }}</p>
            <p><strong>Product Quantity:</strong> {{ $datalist['productQuantity'] }}</p>
            <p><strong>Product Price:</strong> {{ $datalist['productPrice'] }}</p>
            <p><strong>Date:</strong> {{ now()->format('Y-m-d') }}</p>
        </div>
        <div class="total">
            <p><strong>Total:</strong>
                {{ $datalist['productQuantity'] * ($datalist['productPrice'] - $datalist['productPrice'] * ($datalist['promotion'] / 100)) }}
            </p>
            <p><strong>TVA:</strong>
                {{ $datalist['productQuantity'] * ($datalist['productPrice'] - $datalist['productPrice'] * ($datalist['promotion'] / 100)) * 0.2 }}
            </p>
            <p><strong>Total TTC:</strong>
                {{ $datalist['productQuantity'] * ($datalist['productPrice'] - $datalist['productPrice'] * ($datalist['promotion'] / 100)) * 1.2 }}
            </p>
        </div>
    </div>
</body>

</html>
