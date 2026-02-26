export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-[#0F0F0F] text-[#FFFAF0]">

            <aside className="w-64 bg-[#111111] border-r border-[#6B8E23] p-6">
                <h2 className="text-2xl font-bold text-[#6B8E23] mb-10">
                    MedTech Admin
                </h2>

                <nav className="flex flex-col gap-4 text-[#E3DAC9]">
                    <a href="/admin" className="hover:text-[#6B8E23] transition">
                        Dashboard
                    </a>
                    <a href="/admin/products" className="hover:text-[#6B8E23] transition">
                        Products
                    </a>
                    <a href="/admin/orders" className="hover:text-[#6B8E23] transition">
                        Orders
                    </a>
                    <a href="/admin/coupons" className="hover:text-[#6B8E23] transition">
                        Coupons
                    </a>
                </nav>
            </aside>

            <main className="flex-1 p-10">
                {children}
            </main>

        </div>
    );
}