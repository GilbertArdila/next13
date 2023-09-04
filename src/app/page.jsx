
import { prisma } from "@/libs/prisma";
import Card from "@/components/card/page";

async function loadProducts() {
  const response = await prisma.product.findMany();
  return response;
}
//to production
// export const revalidate = 60;
export const dynamic = 'force-dynamic'
export async  function Home() {
  const products =await loadProducts();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Welcome to my store</h1>
      <div className=" flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center">
        {products && products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

    </main>
  )
}

export default Home