import StockModal from "@/components/StockModal";
import StockTable from "@/components/StockTable";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <StockModal />
    <StockTable />
  </section>
);

export default Home;
