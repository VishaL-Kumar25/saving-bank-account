import React, { useState, useEffect } from 'react';

function SavingsAccounts() {
  const [savingsData, setSavingsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/savings-data.json')
      .then(response => response.json())
      .then(data => setSavingsData(data));
  }, []);

  const filteredData = savingsData.filter(account => 
    account.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold leading-[36px] text-e4efee bg-[#008c85] p-4 mb-4">
        Savings accounts
      </h2>

      <input 
        type="text" 
        placeholder="Search by product" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full" 
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#008c85] text-white">
            <th className="p-3 font-bold">Product</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(account => (
              <tr 
                key={account.product} 
                className="border-t border-gray-300 cursor-pointer"
                onClick={() => handleProductClick(account)} 
              >
                <td className="p-3">{account.product}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center">No products found.</td> 
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">{selectedProduct.product}</h3>
            <p>
              <span className="font-bold">Interest Rate:</span> {selectedProduct.interestRate}
            </p>
            <p>
              <span className="font-bold">Minimum Deposit:</span> {selectedProduct.minimumDeposit}
            </p>
            <p>
              <span className="font-bold">Interest Type:</span> {selectedProduct.interestType}
            </p>
            <button 
              onClick={() => setShowModal(false)} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavingsAccounts;