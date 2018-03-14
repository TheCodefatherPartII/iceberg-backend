const transactions = (accountId) => {
  return () => {
    return [
      { timestamp: new Date(), description: "WOOLWORTHS MASCOT", amount: -100, merchant: "Woolworths", lat: 123, lng: -123 },
      { timestamp: new Date(), description: "MASCOT DEPOSIT", amount: 100, merchant: null, lat: 123, lng: -123 },
    ]
  }
}

module.exports = transactions
