const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function test() {
  try {
    console.log("🔍 Testing database connection...");
    
    // Test 1: Count users
    const userCount = await prisma.user.count();
    console.log(`✓ Database connected. User count: ${userCount}`);
    
    // Test 2: Try to create a test record to force database write
    console.log("📝 Creating test record...");
    const testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: `test-${Date.now()}@example.com`,
        password: "hashed_password_123",
        totalPoints: 0,
      },
    });
    console.log(`✓ Test record created with ID: ${testUser.id}`);
    
    // Test 3: Delete test record
    await prisma.user.delete({
      where: { id: testUser.id },
    });
    console.log("✓ Test record cleaned up");
    
    console.log("\n✅ SUCCESS! Database is fully functional.");
    console.log("Signup/Signin should now work properly.");
    
  } catch (error) {
    console.error("\n❌ DATABASE ERROR:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    if (error.meta) {
      console.error("Details:", error.meta);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

test();
