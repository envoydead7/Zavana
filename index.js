document.addEventListener("DOMContentLoaded", () => {
        const investmentData = {
          labels: [
            "Liquid Filling Machine",
            "SS304 Mixing Tank",
            "Bottle Labeling Machine",
            "Bottle Capping Machine",
            "Initial Raw Material & Setup",
            "Lab & QC Equipment",
          ],
          datasets: [
            {
              label: "Investment Allocation",
              data: [130000, 110000, 80000, 45000, 50000, 35000],
              backgroundColor: [
                "#457B9D",
                "#A8DADC",
                "#F1FAEE",
                "#b5838d",
                "#6B705C",
                "#CCC5B9",
              ],
              borderColor: "#FBF9F6",
              borderWidth: 4,
              hoverOffset: 12,
            },
          ],
        };

        const legendContainer = document.getElementById("investment-legend");
        investmentData.labels.forEach((label, index) => {
          const value = investmentData.datasets[0].data[index];
          const color = investmentData.datasets[0].backgroundColor[index];
          const li = document.createElement("li");
          li.className = "flex items-center text-sm";
          li.innerHTML = `
            <span class="w-4 h-4 rounded-full mr-3" style="background-color: ${color};"></span>
            <span class="flex-grow">${label}</span>
            <span class="font-semibold">₹${value.toLocaleString("en-IN")}</span>
        `;
          legendContainer.appendChild(li);
        });

        const ctx = document.getElementById("investmentChart").getContext("2d");
        const investmentChart = new Chart(ctx, {
          type: "doughnut",
          data: investmentData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed !== null) {
                      label += new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(context.parsed);
                    }
                    return label;
                  },
                },
              },
            },
            cutout: "60%",
          },
        });

        const counters = document.querySelectorAll("span[data-target]");
        const speed = 200;

        const animateCounter = (counter) => {
          const target = +counter.getAttribute("data-target");
          const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 1);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        };

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.5 }
        );

        counters.forEach((counter) => {
          observer.observe(counter);
        });

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              const headerOffset =
                document.getElementById("header").offsetHeight;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          });
        });
      });