# AAPL (Apple) Income Statement Table

A simple table that displays income statements from Apple.

The application utilizes an API from Financial Modeling Prep, which provides the data listed within the table.

- Here is the [API](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements) from their website.

## How to Run the Project Locally

- Clone the project

- Run `npm install` to install all dependencies.

- Create an account on [Financial Modeling Prep](https://site.financialmodelingprep.com/)'s website.

- Navigate to the [Income Statement API](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements) while logged in to be given a free key for the API.

- Return to the project within your development environment.

- Navigate to `incomeStatement.tsx` within the `src` folder.

- Here you will see this code:

```ts
const res = await Axios.get(
  "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=mI1rmAhgGhOMs5lSybAPl0BP0LqO1pKQ"
);
```

- Replace the text after `apikey=` with the key provided to you by Financial Modeling Prep. It should be located within the URL of the API.

- Type `npm run dev` into the terminal of your production enviroment.

- Follow the link provided when the project runs and you should see the populated table. From here you can filter and sort as you like.

## View the project on Vercel

This project is deployed on Vercel.

You can view it [here].(https://vercel.com/chad-s-projects-353ab72c/appl-income-statement-api-table)

Be aware, the API key provided can only be called upon 250 times per day with the free plan. If the table fails to fetch the statements, this is likely why.

To avoid this, simply follow the steps above to run the project on your own device with a brand new key.
