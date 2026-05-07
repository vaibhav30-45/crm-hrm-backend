import { useState, useEffect } from "react";
import {
  FaChartLine,
  FaTrash,
  FaPlus,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { crmService } from "../../services/crmService";

const SalesPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: "",
    value: "",
    stage: "Prospecting"
  });

  const stages = ["Prospecting", "Negotiation", "Closed Won", "Closed Lost"];

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await crmService.deals.getAll();
      if (response.success) {
        setDeals(response.data);
      }
    } catch (err) {
      console.error("Error fetching deals:", err);
      setError("Failed to fetch deals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleAddDeal = async () => {
    try {
      const response = await crmService.deals.create(newDeal);
      if (response.success) {
        setShowAddModal(false);
        setNewDeal({ title: "", value: "", stage: "Prospecting" });
        fetchDeals();
      }
    } catch (err) {
      alert("Error creating deal: " + err.message);
    }
  };

  const handleUpdateStage = async (id, newStage) => {
    try {
      const response = await crmService.deals.updateStage(id, newStage);
      if (response.success) {
        fetchDeals();
      }
    } catch (err) {
      alert("Error updating stage: " + err.message);
    }
  };

  const handleDeleteDeal = async (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      try {
        await crmService.deals.delete(id);
        fetchDeals();
      } catch (err) {
        alert("Error deleting deal");
      }
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a" }}>Sales Pipeline</h2>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Manage your deals and track progress</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: "#0ea5e9",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaPlus /> Add Deal
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>Loading pipeline...</div>
        ) : (
          <div style={{ 
            display: "flex", 
            gap: "20px", 
            overflowX: "auto", 
            paddingBottom: "20px",
            minHeight: "calc(100vh - 200px)"
          }}>
            {stages.map(stage => (
              <div key={stage} style={{ 
                minWidth: "300px", 
                backgroundColor: "#f1f5f9", 
                borderRadius: "12px", 
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#475569", textTransform: "uppercase" }}>
                    {stage} ({deals.filter(d => d.stage === stage).length})
                  </h3>
                </div>

                {deals.filter(d => d.stage === stage).map(deal => (
                  <div key={deal._id} style={{ 
                    backgroundColor: "white", 
                    padding: "16px", 
                    borderRadius: "8px", 
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    border: "1px solid #e2e8f0"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
                      <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#1e293b" }}>{deal.title}</h4>
                      <button 
                        onClick={() => handleDeleteDeal(deal._id)}
                        style={{ border: "none", background: "none", cursor: "pointer", color: "#94a3b8" }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#0ea5e9", fontWeight: "700", marginBottom: "12px" }}>
                      <FaDollarSign size={14} />
                      <span>{deal.value?.toLocaleString() || 0}</span>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <select 
                        value={deal.stage}
                        onChange={(e) => handleUpdateStage(deal._id, e.target.value)}
                        style={{ 
                          width: "100%", 
                          padding: "6px", 
                          fontSize: "12px", 
                          borderRadius: "4px", 
                          border: "1px solid #e2e8f0",
                          backgroundColor: "#f8fafc"
                        }}
                      >
                        {stages.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {showAddModal && (
          <div style={{ 
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 
          }}>
            <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", width: "400px" }}>
              <h3 style={{ marginBottom: "20px" }}>Add New Deal</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input 
                  placeholder="Deal Title"
                  value={newDeal.title}
                  onChange={e => setNewDeal({...newDeal, title: e.target.value})}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                />
                <input 
                  placeholder="Value (Amount)"
                  type="number"
                  value={newDeal.value}
                  onChange={e => setNewDeal({...newDeal, value: e.target.value})}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                />
                <select 
                  value={newDeal.stage}
                  onChange={e => setNewDeal({...newDeal, stage: e.target.value})}
                  style={{ padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}
                >
                  {stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  <button onClick={handleAddDeal} style={{ flex: 1, padding: "10px", background: "#0ea5e9", color: "white", border: "none", borderRadius: "6px" }}>Create</button>
                  <button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: "10px", background: "#f1f5f9", border: "none", borderRadius: "6px" }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SalesPipeline;
