const PHASES = [
  {
    id:'p1', n:1, title:'Java + Spring 核心夯实', sub:'Week 1–8 · 约第 1–2 月', color:'#378ADD',
    note:'先打牢语言与 Spring 原理，设计模式紧跟 Spring 学更易理解。在职且日常用 Spring 可将 Week 6–7 压缩为复习，时间让给项目',
    sections:[
      { id:'s105', week:'全程并行', title:'算法热身（从第 1 天开始）',
        resources:[
          { label:'LeetCode 中国', url:'https://leetcode.cn/', type:'刷题' },
          { label:'代码随想录', url:'https://programmercarl.com/', type:'题单' },
        ],
        tasks:[
          { id:'t041', t:'工作日每天 1 题 LeetCode（Easy 为主），坚持到拿到 offer（P1–P4 累计 60+，P5 再刷 40 Medium，总量 100+）', parallel:true },
          { id:'t042', t:'第 1 月重点：数组、链表各 10 题' },
        ]
      },
      { id:'s101', week:'Week 1–2', title:'Java 集合框架',
        resources:[
          { label:'JavaGuide 集合', url:'https://javaguide.cn/java/collection/', type:'网站' },
          { label:'ArrayList 源码分析', url:'https://javaguide.cn/java/collection/arraylist-source-code.html', type:'文章' },
          { label:'HashMap 源码分析', url:'https://javaguide.cn/java/collection/hashmap-source-code.html', type:'文章' },
          { label:'《Java 核心技术 卷I》', type:'书籍' },
        ],
        tasks:[
          { id:'t006', t:'理解 Java 集合体系：Collection / Map 两大分支，List / Set / Map 常用实现类及选型场景' },
          { id:'t007', t:'理解 ArrayList 底层：elementData 动态数组、扩容 1.5 倍、modCount 与 fail-fast 原理' },
          { id:'t004', t:'对比 ArrayList vs LinkedList 在随机访问、头尾/中间插入删除场景下的性能与选型' },
          { id:'t001', t:'理解 HashMap 底层结构（数组+链表+红黑树），搞清楚 JDK 8 树化阈值 8、退化阈值 6' },
          { id:'t002', t:'手画 HashMap.put() 完整流程图，包含 hash 计算、位置定位、扩容触发', practice:true },
          { id:'t005', t:'实践：写代码复现 HashMap 多线程并发 put 导致的数据丢失问题（为 Week 4 学 CHM 做铺垫）', practice:true },
        ]
      },
      { id:'s102', week:'Week 3', title:'Java 8 函数式编程',
        resources:[
          { label:'Oracle Java SE 文档', url:'https://docs.oracle.com/en/java/javase/17/', type:'官方' },
          { label:'《Java 核心技术》Lambda 章节', type:'书籍' },
        ],
        tasks:[
          { id:'t011', t:'掌握四大函数式接口：Function、Predicate、Consumer、Supplier' },
          { id:'t012', t:'Stream API：filter / map / flatMap / reduce / collect 各写 2 个例子' },
          { id:'t013', t:'Optional 正确使用，避免 isPresent() + get() 反模式' },
          { id:'t015', t:'实践：将工作代码中一段 for 循环改写为 Stream 链式写法', practice:true },
        ]
      },
      { id:'s103', week:'Week 4–5', title:'Java 多线程',
        resources:[
          { label:'《Java 并发编程实战》', type:'书籍' },
          { label:'JavaGuide 并发', url:'https://javaguide.cn/java/concurrent/', type:'网站' },
          { label:'尚硅谷 JUC 教程', url:'https://search.bilibili.com/all?keyword=尚硅谷JUC', type:'视频' },
        ],
        tasks:[
          { id:'t021', t:'synchronized：对象锁 vs 类锁，锁升级（偏向→轻量→重量）' },
          { id:'t022', t:'volatile：可见性、禁止重排序，与 synchronized 的区别' },
          { id:'t023', t:'ThreadLocal：原理、内存泄漏原因、正确使用 remove()' },
          { id:'t024', t:'ThreadPoolExecutor：7 个核心参数 + 4 种拒绝策略，结合项目举例' },
          { id:'t003', t:'对比 HashMap vs ConcurrentHashMap，理解 JDK8 CAS + synchronized 桶锁（非 JDK7 分段锁）' },
          { id:'t014', t:'CompletableFuture：thenApply / thenCompose / allOf 异步组合（结合线程池使用）' },
          { id:'t025', t:'实践：扫描工作项目，找一处线程安全风险并分析', practice:true },
        ]
      },
      { id:'s104', week:'Week 6–7', title:'Spring Core 深入',
        resources:[
          { label:'Spring 官方文档', url:'https://docs.spring.io/spring-framework/reference/', type:'官方' },
          { label:'Spring Boot 3 文档', url:'https://docs.spring.io/spring-boot/docs/current/reference/html/', type:'官方' },
          { label:'《Spring 实战》第6版', type:'书籍' },
        ],
        tasks:[
          { id:'t031', t:'Spring Bean 生命周期：实例化→注入→Aware→BPP→初始化→销毁' },
          { id:'t032', t:'@Transactional 6 种失效场景，逐一写代码复现', practice:true },
          { id:'t033', t:'AOP：JDK Proxy vs CGLIB，理解同类内调用不触发切面' },
          { id:'t034', t:'Boot 3 自动装配：@EnableAutoConfiguration → AutoConfiguration.imports → @Conditional' },
          { id:'t035', t:'Spring MVC 请求链路：DispatcherServlet → Mapping → Interceptor → Controller' },
        ]
      },
      { id:'s106', week:'Week 8', title:'设计模式',
        resources:[
          { label:'JavaGuide 设计模式', url:'https://javaguide.cn/system-design/design-pattern/', type:'网站' },
          { label:'Refactoring Guru', url:'https://refactoring.guru/design-patterns', type:'教程' },
          { label:'《Head First 设计模式》', type:'书籍' },
        ],
        tasks:[
          { id:'t051', t:'掌握单例、工厂、策略、模板方法、观察者 5 种常用模式及适用场景' },
          { id:'t052', t:'在 JDK/Spring 中找应用：Runtime(单例)、BeanFactory(工厂)、Spring ApplicationEvent(观察者)' },
          { id:'t053', t:'理解 Spring AOP 与代理模式的关系，对比代理模式与装饰器模式' },
          { id:'t054', t:'实践：用策略模式重构工作代码中一段 if-else 业务分支', practice:true },
          { id:'t055', t:'整理 5 种模式各 1 个面试问答：解决什么问题、项目里哪用过' },
          { id:'t056', t:'阶段自测：15 分钟讲清 HashMap put 流程 + @Transactional 2 种失效场景 + 1 种设计模式项目应用', practice:true },
        ]
      },
    ]
  },
  {
    id:'p2', n:2, title:'基础设施 + 数据库 + JVM', sub:'Week 9–17 · 约第 2–4 月', color:'#1D9E75',
    note:'先搭环境再补原理：Week 11 部署的中间件，在 Week 14–15 深入时对照同一套环境验证',
    sections:[
      { id:'s201', week:'Week 9–10', title:'Linux + Docker',
        resources:[
          { label:'Docker 从入门到实践', url:'https://yeasy.gitbook.io/docker_practice/', type:'教程' },
          { label:'Docker 官方文档', url:'https://docs.docker.com/', type:'官方' },
          { label:'鸟哥 Linux 私房菜', type:'书籍' },
        ],
        tasks:[
          { id:'t101', t:'Linux 常用命令：文件、权限、进程（ps/top/kill）' },
          { id:'t102', t:'Vim 基础：Normal/Insert 模式，保存退出、查找替换（vimtutor）', optional:true },
          { id:'t103', t:'Docker：镜像/容器/网络/Volume，掌握 build/run/exec/logs' },
          { id:'t104', t:'编写 Dockerfile 将 Spring Boot 3 应用打包成镜像', practice:true },
          { id:'t105', t:'Docker Compose 多服务配置：depends_on、networks、volumes', practice:true },
        ]
      },
      { id:'s202', week:'Week 11–12', title:'云服务器搭建',
        resources:[
          { label:'腾讯云轻量文档', url:'https://cloud.tencent.com/document/product/1207', type:'官方' },
          { label:'阿里云 ECS 文档', url:'https://help.aliyun.com/product/25365.html', type:'官方' },
          { label:'Nginx 入门指南', url:'https://nginx.org/en/docs/beginners_guide.html', type:'官方' },
        ],
        tasks:[
          { id:'t111', t:'购买云服务器（2核2G）或使用本地 Docker 等效环境，配置 SSH 密钥登录' },
          { id:'t112', t:'配置安全组/防火墙，理解入站出站端口规则' },
          { id:'t113', t:'Docker Compose 部署 MySQL + Redis + Nacos', practice:true },
          { id:'t114', t:'验证服务连通性，配置 Nacos 持久化到 MySQL' },
          { id:'t115', t:'域名 + Nginx 反向代理 upstream/proxy_pass', optional:true },
        ]
      },
      { id:'s203', week:'Week 13', title:'Jenkins CI/CD',
        resources:[
          { label:'Jenkins 官方手册', url:'https://www.jenkins.io/doc/book/', type:'官方' },
          { label:'Pipeline 语法', url:'https://www.jenkins.io/doc/book/pipeline/syntax/', type:'官方' },
        ],
        tasks:[
          { id:'t121', t:'Docker 部署 Jenkins，安装 JDK/Maven/Git 插件' },
          { id:'t126', t:'Git 协作：feature 分支开发、PR/MR 流程、解决 merge 冲突' },
          { id:'t122', t:'Freestyle 任务：拉代码 → mvn package → 部署到服务器', practice:true },
          { id:'t123', t:'改用 Jenkinsfile 声明式 Pipeline（stages/steps）', practice:true, optional:true },
          { id:'t124', t:'配置 Git Webhook 自动触发构建', optional:true },
          { id:'t125', t:'加入构建通知（钉钉 Webhook 或邮件）', optional:true },
        ]
      },
      { id:'s204', week:'Week 14', title:'MySQL 深入',
        resources:[
          { label:'小林 coding MySQL', url:'https://xiaolincoding.com/mysql/', type:'图解' },
          { label:'《高性能 MySQL》', type:'书籍' },
          { label:'极客时间 MySQL 45讲', url:'https://time.geekbang.org/', type:'课程' },
        ],
        tasks:[
          { id:'t131', t:'EXPLAIN：type 字段含义（system>const>ref>range>index>ALL）' },
          { id:'t132', t:'索引：最左前缀、覆盖索引、索引失效 10 种场景' },
          { id:'t133', t:'MVCC：Read View、undo log、trx_id/roll_pointer 协作' },
          { id:'t134', t:'死锁：4 必要条件，SHOW ENGINE INNODB STATUS 定位' },
          { id:'t135', t:'实践：分析工作中 3 条慢 SQL 并给出索引优化', practice:true },
          { id:'t136', t:'对照 Week 11 部署的 MySQL：用 EXPLAIN 分析 Nacos 持久化相关慢查询', practice:true },
        ]
      },
      { id:'s205', week:'Week 15', title:'Redis 基础（项目前置）',
        resources:[
          { label:'Redis 官方文档', url:'https://redis.io/docs/', type:'官方' },
          { label:'JavaGuide Redis', url:'https://javaguide.cn/database/redis/', type:'网站' },
          { label:'小林 coding Redis', url:'https://xiaolincoding.com/redis/', type:'图解' },
        ],
        tasks:[
          { id:'t141', t:'五种数据结构使用场景：String/Hash/List/Set/ZSet' },
          { id:'t142', t:'过期策略 + 内存淘汰策略（LRU/LFU）' },
          { id:'t143', t:'缓存穿透/击穿/雪崩的原因与解决方案' },
          { id:'t144', t:'分布式锁：SET NX EX 缺陷 + Redisson 基本原理' },
          { id:'t145', t:'实践：在本地项目实现一个接口缓存 + 缓存更新', practice:true },
          { id:'t146', t:'对照 Week 11 部署的 Redis：验证缓存穿透/击穿防护方案', practice:true },
        ]
      },
      { id:'s206', week:'Week 16–17', title:'JVM 基础',
        resources:[
          { label:'《深入理解 Java 虚拟机》', type:'书籍' },
          { label:'Oracle JVM 参数', url:'https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html', type:'官方' },
          { label:'Eclipse MAT', url:'https://eclipse.dev/mat/', type:'工具' },
        ],
        tasks:[
          { id:'t321', t:'JVM 内存区域：堆/栈/方法区/程序计数器，各区 OOM 类型' },
          { id:'t322', t:'GC 算法：标记清除/复制/整理，Minor GC vs Full GC' },
          { id:'t323', t:'G1 收集器：Region 结构、Mixed GC（了解 ZGC 即可）' },
          { id:'t324', t:'OOM 排查：jmap dump + MAT 分析大对象/泄漏', practice:true },
          { id:'t325', t:'JVM 参数：-Xms/-Xmx/-Xss/-XX:+HeapDumpOnOutOfMemoryError' },
          { id:'t329', t:'阶段自测：口述 G1 GC 流程 + 一次 OOM 排查步骤', practice:true },
        ]
      },
    ]
  },
  {
    id:'p3', n:3, title:'个人微服务项目', sub:'Week 18–29 · 约第 4.5–7 月（核心，勿压缩）', color:'#EF9F27',
    note:'含 Kafka 实战与分布式事务接入。Week 18 复用 P2 的 Nacos/MySQL/Redis 环境，避免重复搭建',
    sections:[
      { id:'s301', week:'Week 18–19', title:'项目脚手架搭建',
        resources:[
          { label:'Spring Cloud Alibaba', url:'https://sca.aliyun.com/', type:'官方' },
          { label:'Nacos 快速开始', url:'https://nacos.io/docs/latest/quickstart/quick-start/', type:'官方' },
          { label:'Gateway 文档', url:'https://docs.spring.io/spring-cloud-gateway/reference/', type:'官方' },
          { label:'MyBatis-Plus 文档', url:'https://baomidou.com/', type:'官方' },
        ],
        tasks:[
          { id:'t201', t:'规划模块：gateway / auth / user / order / inventory / common，明确职责边界' },
          { id:'t202', t:'Maven 多模块父子工程 + dependencyManagement 统一版本', practice:true },
          { id:'t206', t:'MyBatis-Plus 持久层 + 核心表设计（user/order/inventory 等）', practice:true },
          { id:'t207', t:'统一响应体 Result + 分页封装 + DTO/VO 分层规范', practice:true },
          { id:'t203', t:'复用 P2 环境接入 Nacos 注册 + 配置中心，验证服务互相发现', practice:true },
          { id:'t204', t:'Spring Cloud Gateway：路由、Predicate、全局过滤器', practice:true },
          { id:'t205', t:'Feign 服务间调用 + 超时/重试配置', practice:true },
        ]
      },
      { id:'s302', week:'Week 20–21', title:'RBAC 权限系统',
        resources:[
          { label:'Spring Security 文档', url:'https://docs.spring.io/spring-security/reference/', type:'官方' },
          { label:'JWT.io', url:'https://jwt.io/', type:'工具' },
          { label:'RBAC 设计参考', url:'https://javaguide.cn/system-design/security/rbac.html', type:'文章' },
        ],
        tasks:[
          { id:'t211', t:'设计 RBAC 五表：user/role/permission/user_role/role_permission' },
          { id:'t212', t:'JWT 登录流程：登录→颁 Token→网关解析→传递下游', practice:true },
          { id:'t213', t:'Spring Security：UserDetailsService + @PreAuthorize 接口权限', practice:true },
          { id:'t214', t:'网关鉴权过滤器：校验 Token，userId 放入请求头', practice:true },
          { id:'t216', t:'order/inventory 模块：下单 + 扣库存 REST 接口（Seata 前置）', practice:true },
          { id:'t215', t:'双 Token（Access + Refresh）无感刷新', practice:true, optional:true },
        ]
      },
      { id:'s303', week:'Week 22–23', title:'全链路日志追踪',
        resources:[
          { label:'SLF4J MDC 文档', url:'http://www.slf4j.org/manual.html#mdc', type:'官方' },
          { label:'Logback 配置', url:'https://logback.qos.ch/manual/configuration.html', type:'官方' },
        ],
        tasks:[
          { id:'t221', t:'网关 GlobalFilter 生成 traceId，注入 X-Trace-Id', practice:true },
          { id:'t222', t:'下游 Interceptor：traceId 放入 MDC，请求结束 remove', practice:true },
          { id:'t223', t:'Feign RequestInterceptor 透传 X-Trace-Id', practice:true },
          { id:'t224', t:'Logback pattern 加入 %X{traceId} %X{serviceName}', practice:true },
          { id:'t225', t:'验证：gateway→auth→order 全链路 traceId 一致', practice:true },
        ]
      },
      { id:'s304', week:'Week 24–25', title:'SkyWalking + 项目完善',
        resources:[
          { label:'SkyWalking 文档', url:'https://skywalking.apache.org/docs/', type:'官方' },
          { label:'Knife4j 文档', url:'https://doc.xiaominfo.com/', type:'官方' },
        ],
        tasks:[
          { id:'t231', t:'Docker 部署 SkyWalking OAP + UI', practice:true, optional:true },
          { id:'t232', t:'Java Agent 接入（-javaagent 参数），UI 验证调用链路', practice:true },
          { id:'t234', t:'全局异常处理 @RestControllerAdvice + @Validated 参数校验', practice:true },
          { id:'t235', t:'Knife4j 接口文档，完善注解和描述', practice:true },
          { id:'t236', t:'项目内 Redis 缓存：热点接口加缓存 + 更新策略', practice:true },
        ]
      },
      { id:'s305', week:'Week 26–27', title:'Kafka 实战接入',
        resources:[
          { label:'《Kafka 权威指南》', type:'书籍' },
          { label:'Kafka 官方文档', url:'https://kafka.apache.org/documentation/', type:'官方' },
          { label:'Spring Kafka 文档', url:'https://docs.spring.io/spring-kafka/reference/', type:'官方' },
        ],
        tasks:[
          { id:'t241', t:'Docker Compose 部署 Kafka（KRaft 或 ZooKeeper 模式）', practice:true },
          { id:'t242', t:'Spring Kafka 生产者：发送业务消息，配置 acks、retries、幂等', practice:true },
          { id:'t243', t:'消费者：ConsumerGroup、手动提交 Offset、处理重复消费', practice:true },
          { id:'t244', t:'消息不丢失：生产者确认 + Broker 持久化 + 消费者手动 ack', practice:true },
          { id:'t245', t:'项目落地：Kafka 实现订单状态变更异步通知', practice:true },
        ]
      },
      { id:'s306', week:'Week 28–29', title:'分布式事务',
        resources:[
          { label:'Seata 官方文档', url:'https://seata.io/zh-cn/docs/overview/what-is-seata.html', type:'官方' },
          { label:'JavaGuide 分布式事务', url:'https://javaguide.cn/distributed-system/distributed-transaction.html', type:'网站' },
          { label:'SCA Seata 接入', url:'https://sca.aliyun.com/docs/2022/user-guide/seata/overview/', type:'官方' },
        ],
        tasks:[
          { id:'t251', t:'本地事务 vs 分布式事务，2PC/TCC/Saga/消息最终一致性 对比' },
          { id:'t252', t:'Seata AT 模式原理：undo log、一阶段提交、二阶段异步删除' },
          { id:'t253', t:'AT vs TCC vs Saga 适用场景：何时用 Seata、何时用 MQ 最终一致性' },
          { id:'t254', t:'实践：order + inventory 接入 Seata AT，实现跨服务下单扣库存', practice:true },
          { id:'t255', t:'面试准备：哪些场景其实不需要分布式事务（避免过度设计）' },
        ]
      },
    ]
  },
  {
    id:'p4', n:4, title:'深度技术提升', sub:'Week 30–35 · 约第 7.5–9 月', color:'#7F77DD',
    note:'Redis 深入与项目文档化并行，为求职做最后技术储备',
    sections:[
      { id:'s401', week:'Week 30–31', title:'Redis 深入',
        resources:[
          { label:'《Redis 设计与实现》', type:'书籍' },
          { label:'Redisson Wiki', url:'https://github.com/redisson/redisson/wiki', type:'官方' },
          { label:'JavaGuide Redis 面试', url:'https://javaguide.cn/database/redis/redis-questions.html', type:'网站' },
        ],
        tasks:[
          { id:'t301', t:'底层结构：SDS/跳表/quicklist/listpack' },
          { id:'t302', t:'持久化：RDB vs AOF vs 混合持久化对比' },
          { id:'t303', t:'Redisson WatchDog 自动续期原理' },
          { id:'t304', t:'缓存三大问题深入 + 布隆过滤器/互斥锁/随机TTL' },
          { id:'t305', t:'实践：Lua 脚本实现滑动窗口限流器', practice:true, optional:true },
        ]
      },
      { id:'s402', week:'Week 32–33', title:'系统设计基础',
        resources:[
          { label:'《Kafka 权威指南》', type:'书籍' },
          { label:'Sentinel 文档', url:'https://sentinelguard.io/zh-cn/docs/introduction.html', type:'官方' },
          { label:'JavaGuide 系统设计', url:'https://javaguide.cn/system-design/', type:'网站' },
          { label:'小林 coding 网络', url:'https://xiaolincoding.com/network/', type:'图解' },
        ],
        tasks:[
          { id:'t311', t:'Kafka 概念巩固：Topic/Partition/ConsumerGroup/Offset，结合 Phase3 实战回顾' },
          { id:'t316', t:'计算机网络：TCP 三次握手/四次挥手、HTTP vs HTTPS、长连接与短连接' },
          { id:'t317', t:'操作系统基础：进程 vs 线程、用户态/内核态、Epoll IO 多路复用（了解即可）' },
          { id:'t312', t:'Sentinel 熔断降级接入项目，理解滑动窗口统计', practice:true, optional:true },
          { id:'t313', t:'雪花算法结构 + 时钟回拨问题与方案' },
          { id:'t314', t:'限流：令牌桶 vs 漏桶 vs 滑动窗口适用场景' },
          { id:'t315', t:'设计秒杀方案：Redis 预减 + Kafka 异步落库 + 幂等', practice:true },
        ]
      },
      { id:'s403', week:'Week 34', title:'JVM 复习巩固',
        resources:[
          { label:'《深入理解 Java 虚拟机》', type:'书籍' },
          { label:'JavaGuide JVM', url:'https://javaguide.cn/java/jvm/', type:'网站' },
        ],
        tasks:[
          { id:'t326', t:'二刷 JVM：手绘内存布局，口述各区域存什么、哪些 OOM' },
          { id:'t327', t:'模拟面试：讲清 G1 GC 流程，与 CMS/ZGC 区别' },
          { id:'t328', t:'模拟面试：线上 OOM 排查步骤（dump→MAT→定位→修复）' },
        ]
      },
      { id:'s404', week:'Week 35', title:'项目完善与文档',
        resources:[
          { label:'JUnit 5 文档', url:'https://junit.org/junit5/docs/current/user-guide/', type:'官方' },
          { label:'JMeter 用户手册', url:'https://jmeter.apache.org/usermanual/index.html', type:'官方' },
          { label:'draw.io', url:'https://app.diagrams.net/', type:'工具' },
        ],
        tasks:[
          { id:'t331', t:'JUnit 5 + Mockito 单测，核心 Service 覆盖率 60%', practice:true, optional:true },
          { id:'t332', t:'JMeter 压测核心接口，分析 TPS/响应时间/错误率', practice:true, optional:true },
          { id:'t336', t:'Jenkins Pipeline 构建并部署微服务项目', practice:true },
          { id:'t333', t:'README：架构图 + 技术选型 + 本地/云端一键启动', practice:true },
          { id:'t334', t:'整理项目亮点 3-5 条，STAR 法则准备讲解稿' },
          { id:'t335', t:'录制 3-5 分钟项目 demo 视频', optional:true },
          { id:'t337', t:'阶段自测：无稿 5 分钟 demo 项目 + 回答 3 个技术追问', practice:true },
        ]
      },
    ]
  },
  {
    id:'p5', n:5, title:'求职冲刺', sub:'Week 36–41 · 约第 9–10 月', color:'#D85A30',
    note:'算法与八股并行推进，按优先级分批完成，不求一次刷完所有题目',
    sections:[
      { id:'s501', week:'Week 36–38', title:'算法强化',
        resources:[
          { label:'LeetCode 中国', url:'https://leetcode.cn/', type:'刷题' },
          { label:'代码随想录', url:'https://programmercarl.com/', type:'题单' },
          { label:'NeetCode 150', url:'https://neetcode.io/practice', type:'题单' },
        ],
        tasks:[
          { id:'t401', t:'数组/链表：两数之和、反转链表、合并有序链表' },
          { id:'t402', t:'栈/队列：有效括号、最小栈、滑动窗口最大值' },
          { id:'t403', t:'二分：搜索旋转数组、查找首尾位置' },
          { id:'t404', t:'二叉树：前中后序、最大深度、对称二叉树（BFS+DFS）' },
          { id:'t405', t:'本阶段完成 40 道 Medium，配合 P1 并行刷题，累计总量 100+ 题' },
        ]
      },
      { id:'s502', week:'Week 39–41', title:'面试冲刺',
        resources:[
          { label:'JavaGuide 面试题', url:'https://javaguide.cn/interview-preparation/interview-preparation.html', type:'网站' },
          { label:'小林 coding', url:'https://xiaolincoding.com/', type:'图解' },
          { label:'《Java 面试指北》', url:'https://javaguide.cn/zhuanlan/java-mian-shi-zhi-bei.html', type:'专栏' },
        ],
        tasks:[
          { id:'t411', t:'Java 高频 50 题：用自己的话写出理解（不死记硬背）' },
          { id:'t412', t:'MySQL/Redis/Spring/分布式/网络 各 15 条优先高频题 + 答案' },
          { id:'t413', t:'简历优化：项目放首位，量化工作经历（QPS/优化幅度）' },
          { id:'t414', t:'模拟面试 3 次：自我介绍+技术题+项目讲解+反问', practice:true },
          { id:'t415', t:'投递 20-30 家，优先 B 轮以上有技术氛围的互联网公司' },
          { id:'t417', t:'终检：对照路线图必做项，补齐未完成的核心任务', practice:true },
        ]
      },
    ]
  },
];

