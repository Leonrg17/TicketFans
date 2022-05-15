# TicketFans

Use of this application requires Node.js, Ganache, Truffle, and MetaMask.

To run the program head to the directory where it was installed on your terminal and type "npm run start".

When the webpage starts it will prompt you to sign into your metamask wallet.

Once signed in you can create a sell transaction by filling in the fields

Artist Name - String
Ticket ID - Numerical
Seat Number - Numerical
Section number - Numerical
Price - Numerical

Then by hitting save you must finalize your transaction then after the page should reload (reload if it does not update) and the new ticket will be on the market.

Similarly, to purchase you may hit the buy button to purchase a ticket if it has been pruchased or is being purchased by the seller it wil not be sold.

If it has not been sold you must finalize your transaction using MetaMask. Once the webpage is reloaded we will see the buy button is gone.
