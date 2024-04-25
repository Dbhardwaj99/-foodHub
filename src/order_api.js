import { Client, Databases } from "appwrite";

    const client = new Client();

    const databases = new Databases(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') 
        .setProject('66266c3fd4129184d064') 
        .setKey('0ccca2e3cb4ff3a210867c7b13599d3946d88b2b1085e612b4dbe79c40c0aab1419df2cdfc8a29c261066494960ee58cd7f4af87f84bb273949b2e53ab568ad01819661225d2d4c72f6f0130d6659fa108f68a85b65c3e185061a6c808e075915509ab6729459c6ec9e868b1fbd01ef9df311b6063e1fe83cd7ebffe596a0f4b') 
    ;

    export async function fetchOrders() {
        try {
            const promise = databases.listDocuments('66266c7731d81704bff0', 'order');
            const response = await promise;
            return extractOrderData(response.documents); // Assuming the data is in response.documents
        } catch (error) {
            console.error(error);
            return []; // Return an empty array on error
        }
    }

    // extractOrderData(response.data);

    function extractOrderData(apiResponse) {
        // Assuming your API response is in a variable called 'apiResponse' 
        if (apiResponse.documents && apiResponse.documents.length > 0) {
          const orderData = apiResponse.documents[0];
      
          // Extract food item names
          const foodItemNames = orderData.foodItem.map(item => item.name).join(', ');
      
          // Construct the new object
          return {
            id: orderData.id,
            items: foodItemNames,
            status: orderData.Status,
            time: orderData.time,
            price: calculatePrice(orderData.foodItem) // Assuming you have a helper function to calculate price
          };
        } else {
          return null; // Handle cases with no order data
        }
      }
      
      // Helper function to calculate price (if needed)
      function calculatePrice(foodItems) {
        const totalPrice = foodItems.reduce((sum, item) => sum + item.price, 0);
        return '$' + totalPrice.toFixed(2); 
      }