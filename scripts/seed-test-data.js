const ModuleReviews = artifacts.require("ModuleReviews");
const StudentIdentity = artifacts.require("StudentIdentity");

module.exports = async function(callback) {
  try {
    console.log("🌱 Seeding test data...\n");

    // Get deployed contracts
    const moduleReviews = await ModuleReviews.deployed();
    const studentIdentity = await StudentIdentity.deployed();

    console.log("📝 ModuleReviews address:", moduleReviews.address);
    console.log("🆔 StudentIdentity address:", studentIdentity.address);
    console.log("");

    // Get accounts
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    const student1 = accounts[1];
    const student2 = accounts[2];
    const student3 = accounts[3];

    console.log("👤 Owner:", owner);
    console.log("👤 Student 1:", student1);
    console.log("👤 Student 2:", student2);
    console.log("👤 Student 3:", student3);
    console.log("");

    // Issue badges to test students
    console.log("🎫 Issuing badges to test students...");
    try {
      await studentIdentity.issueBadge(student1, { from: owner });
      console.log("✅ Badge issued to Student 1");
    } catch (e) {
      if (e.message.includes("already verified")) {
        console.log("ℹ️  Student 1 already has a badge");
      } else {
        throw e;
      }
    }

    try {
      await studentIdentity.issueBadge(student2, { from: owner });
      console.log("✅ Badge issued to Student 2");
    } catch (e) {
      if (e.message.includes("already verified")) {
        console.log("ℹ️  Student 2 already has a badge");
      } else {
        throw e;
      }
    }

    try {
      await studentIdentity.issueBadge(student3, { from: owner });
      console.log("✅ Badge issued to Student 3");
    } catch (e) {
      if (e.message.includes("already verified")) {
        console.log("ℹ️  Student 3 already has a badge");
      } else {
        throw e;
      }
    }
    console.log("");

    // Add test modules
    console.log("📚 Adding test modules...");
    const testModules = [
      "BA_KRYPTOG_K.H2502", // Kryptologie Grundlagen
      "BA_CLOUDSEC_K.H2501", // Cloud Security
      "BA_BCHAIN.H2501", // Blockchain
      "BA_IMLAB.H2501", // Immersive Labs
      "BA_KUFA_E.H2502", // Die Kunst der Finanzanlagen
      "BA_KRYPTOB.H2501", // Krypto for Business
      "BA_INLPH.H2501", // Introduction to NLP
      "BA_CF.H2501", // Computer Forensic
      "BA_CISO_ISSUES.H2501", // CISO Issues - angewandte Praxis
      "BA_CW.H2501", // CyberWars
      "BA_CYC.H2501", // Cybercrime
      "BA_HTCLAW.H2501", // High Tech Cybercrime & Law
      "BA_MOBINFSEC.H2501", // 5G Mobile Networks, Technologies & Security
      "BA_KRKO.H2501", // Krisenmanagement & -kommunikation
      "BA_MOBILSEC.H2501", // Mobile Security
    ];

    for (const moduleId of testModules) {
      try {
        await moduleReviews.addModule(moduleId, { from: student1 });
        console.log(`✅ Module added: ${moduleId}`);
      } catch (e) {
        if (e.message.includes("already exists")) {
          console.log(`ℹ️  Module ${moduleId} already exists`);
        } else {
          throw e;
        }
      }
    }
    console.log("");

    // Add test reviews
    console.log("⭐ Adding test reviews...");
    
    // Reviews for BA_BCHAIN.H2501 (Blockchain)
    await moduleReviews.addReview("BA_BCHAIN.H2501", 5, 3, 3, "Excellent introduction to blockchain technology. Very relevant for today's applications.", { from: student1 }).catch(() => {});
    await moduleReviews.addReview("BA_BCHAIN.H2501", 4, 4, 4, "Challenging but rewarding. Good mix of theory and practice.", { from: student2 }).catch(() => {});
    console.log("✅ Reviews added to BA_BCHAIN.H2501");

    // Reviews for BA_KRYPTOG_K.H2502 (Kryptologie Grundlagen)
    await moduleReviews.addReview("BA_KRYPTOG_K.H2502", 5, 4, 4, "Fundamental cryptography concepts well explained. Essential for security studies.", { from: student1 }).catch(() => {});
    await moduleReviews.addReview("BA_KRYPTOG_K.H2502", 4, 3, 3, "Solid foundation in cryptography. Good exercises.", { from: student3 }).catch(() => {});
    console.log("✅ Reviews added to BA_KRYPTOG_K.H2502");

    // Reviews for BA_CLOUDSEC_K.H2501 (Cloud Security)
    await moduleReviews.addReview("BA_CLOUDSEC_K.H2501", 4, 3, 3, "Practical cloud security concepts. Very relevant for industry.", { from: student2 }).catch(() => {});
    await moduleReviews.addReview("BA_CLOUDSEC_K.H2501", 5, 2, 2, "Great module! Well structured and practical.", { from: student1 }).catch(() => {});
    console.log("✅ Reviews added to BA_CLOUDSEC_K.H2501");

    // Reviews for BA_CF.H2501 (Computer Forensic)
    await moduleReviews.addReview("BA_CF.H2501", 5, 4, 4, "Fascinating forensics techniques. Hands-on labs are excellent.", { from: student2 }).catch(() => {});
    await moduleReviews.addReview("BA_CF.H2501", 4, 5, 5, "Very demanding but you learn a lot. Requires dedication.", { from: student3 }).catch(() => {});
    console.log("✅ Reviews added to BA_CF.H2501");

    // Reviews for BA_CYC.H2501 (Cybercrime)
    await moduleReviews.addReview("BA_CYC.H2501", 4, 3, 3, "Interesting insights into cybercrime. Good mix of technical and legal aspects.", { from: student1 }).catch(() => {});
    await moduleReviews.addReview("BA_CYC.H2501", 5, 2, 2, "Excellent module! Very engaging content.", { from: student2 }).catch(() => {});
    console.log("✅ Reviews added to BA_CYC.H2501");

    // Reviews for BA_KRYPTOB.H2501 (Krypto for Business)
    await moduleReviews.addReview("BA_KRYPTOB.H2501", 5, 2, 2, "Great business perspective on cryptography. Easy to follow.", { from: student3 }).catch(() => {});
    await moduleReviews.addReview("BA_KRYPTOB.H2501", 4, 3, 3, "Good introduction to crypto in business context.", { from: student1 }).catch(() => {});
    console.log("✅ Reviews added to BA_KRYPTOB.H2501");

    console.log("");
    console.log("✨ Test data seeding complete!");
    console.log("");
    console.log("📊 Summary:");
    console.log("  - Badges issued: 3 students");
    console.log("  - Modules added: " + testModules.length);
    console.log("  - Reviews added: 12+ (across selected modules)");
    console.log("");

    callback();
  } catch (error) {
    console.error("❌ Error seeding test data:", error);
    callback(error);
  }
};


