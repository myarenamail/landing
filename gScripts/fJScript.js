





const { createApp, ref, computed, onMounted } = Vue;

    createApp({
        setup() {
            // Data
            const chatOpen = ref(false);
            const isScrolled = ref(false);
            const activeCategory = ref('all');

            // Categories Definition
            const categories = [
                { id: 'all', name: 'الكل' },
                { id: 'medical', name: 'الحلول الطبية' },
                { id: 'hr', name: 'الإدارة والموارد البشرية' },
                { id: 'finance', name: 'المالية والتشغيل' },
                { id: 'commerce', name: 'التجارة الرقمية' },
                { id: 'cloud', name: 'ماي كلاود' }
            ];

            // Products Database
            const products = [
                // Medical
                { id: 1, category: 'medical', name: 'طبي.. ماي أرينا Care', icon: 'fa-solid fa-user-doctor', desc: 'نظام شامل لإدارة العيادات والمراكز الطبية وملفات المرضى.' , link: 'Care-details.html' },
				
				<!-- myarena LabriCare -->
				
                { id: 2, category: 'medical', name: 'مختبرات.. ماي أرينا LabriCare', icon: 'fa-solid fa-flask', desc: 'إدارة المختبرات الطبية ونتائج التحاليل والربط مع الأجهزة.'  , link: 'LabriCare-details.html' },
				
				
				<!-- myarena ScaniCare -->
				
				
                { id: 3, category: 'medical', name: 'أشعة.. ماي أرينا ScaniCare', icon: 'fa-solid fa-x-ray', desc: 'أرشفة صور الأشعة (PACS) وكتابة التقارير التشخيصية.'  , link: 'ScaniCare-details.html'  },
				
				
                { id: 4, category: 'medical', name: 'للصيدليات.. ماي أرينا PharmaCare', icon: 'fa-solid fa-pills', desc: 'إدارة مخزون الأدوية، الوصفات الإلكترونية، والمبيعات.'   , link: 'PharmaCare-details.html'  },
                
                // HR
                { id: 5, category: 'hr', name: 'للموارد البشرية.. ماي أرينا Smart28', icon: 'fa-solid fa-users-gear', desc: 'نظام ذكي للموارد البشرية، الرواتب، والمهام.'  , link: 'Smart28-details.html' },
				
				
				  { id: 6, category: 'hr', name: 'الأرشفة الإلكترونية.. ماي أرينا Arch28', icon: 'fa-solid fa-box-archive', desc: 'حلول ذكية لأرشفة الملفات إلكترونيا والمراسلات' , link: 'Arch28-details.html' },
				  
				 
                 // Finance & ERP
            
                { id: 7, category: 'finance', name: 'نقاط البيع.. ماي أرينا PAY', icon: 'fa-solid fa-cash-register', desc: 'نقاط بيع سريعة تدعم الفوترة الإلكترونية والباركود.'  , link: 'PAY-details.html' },
				
				
				
                { id: 8, category: 'finance', name: 'للمستودعات.. ماي أرينا Depot', icon: 'fa-solid fa-boxes-stacked', desc: 'إدارة المستودعات، الجرد، والتنبيهات الذكية للنواقص.'  , link: 'Depot-details.html' },

                // Commerce
                { id: 9, category: 'commerce', name: 'للمتاجر.. ماي EzSellz', icon: 'fa-solid fa-shop', desc: 'منصة للتجارة الإلكترونية والإعلانات المبوبة مع دفع إلكتروني.'   , link: 'EzSellz-details.html' },

                // Media
           
				
				
                { id: 10, category: 'cloud', name: 'خدمات.. ماي Neibo', icon: 'fa-solid fa-helmet-safety', desc: 'كل ما يحتاجه حيك في تطبيق واحد؛ أخبار، خدمات، وتواصل مباشر مع جيرانك'  , link: 'Neibo-details.html' },
				
				



				
				 
				
                // Cloud
                { id: 11, category: 'cloud', name: 'أنظمة.. ماي أرينا Cloud', icon: 'fa-brands fa-app-store', desc: 'مكتبة من البرمجيات المترابطة لخدمة هدف واحد.' , link: 'Cloud-details.html' }
            ];
			
			
			

            // Computed Filtering
            const filteredProducts = computed(() => {
                if (activeCategory.value === 'all') return products;
                return products.filter(p => p.category === activeCategory.value);
            });


 


            // Scroll Effect
            const handleScroll = () => {
                isScrolled.value = window.scrollY > 50;
            };

            onMounted(() => {
                window.addEventListener('scroll', handleScroll);
                AOS.init({
                    once: true,
                    offset: 100,
                    duration: 800,
                });
            });

            return {
                chatOpen,
                isScrolled,
                activeCategory,
                categories,
                products,
                filteredProducts
            };
        }
    }).mount('#app');