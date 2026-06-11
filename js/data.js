const PHASES = [
  {
    id:'p1', n:1, title:'Java + Spring 核心夯实', sub:'Month 1–2 · 8周', color:'#378ADD',
    note:'先打牢语言与 Spring 原理，设计模式紧跟 Spring 学更易理解',
    sections:[
      { id:'s101', week:'Week 1–2', title:'Java 集合框架',
        resources:[
          { label:'JavaGuide 集合', url:'https://javaguide.cn/java/collection/', type:'网站' },
          { label:'HashMap 源码分析', url:'https://javaguide.cn/java/collection/hashmap-source-code.html', type:'文章' },
          { label:'《Java 核心技术 卷I》', type:'书籍' },
        ],
        tasks:[
          { id:'t001', t:'理解 HashMap 底层结构（数组+链表+红黑树），搞清楚 JDK 8 树化阈值 8、退化阈值 6' },
          { id:'t002', t:'手画 HashMap.put() 完整流程图，包含 hash 计算、位置定位、扩容触发', practice:true },
          { id:'t003', t:'对比 HashMap vs ConcurrentHashMap，理解 JDK8 CAS + synchronized 桶锁（非 JDK7 分段锁）' },
          { id:'t004', t:'理解 ArrayList vs LinkedList 在增删查场景下的性能差异（有基础快速过）', optional:true },
          { id:'t005', t:'实践：写代码复现 HashMap 多线程并发 put 导致的数据丢失问题', practice:true },
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
          { id:'t014', t:'CompletableFuture：thenApply / thenCompose / allOf 异步组合' },
          { id:'t015', t:'实践：将工作代码中一段 for 循环改写为 Stream 链式写法', practice:true },
        ]
      },
      { id:'s103', week:'Week 4–5', title:'Java 多线程',
        resources:[
          { label:'《Java 并发编程实战》', type:'书籍' },
          { label:'JavaGuide 并发', url:'https://javaguide.cn/java/concurrent/', type:'网站' },
          { label:'尚硅谷 JUC 教程', url:'https://www.bilibili.com', type:'视频' },
        ],
        tasks:[
          { id:'t021', t:'synchronized：对象锁 vs 类锁，锁升级（偏向→轻量→重量）' },
          { id:'t022', t:'volatile：可见性、禁止重排序，与 synchronized 的区别' },
          { id:'t023', t:'ThreadLocal：原理、内存泄漏原因、正确使用 remove()' },
          { id:'t024', t:'ThreadPoolExecutor：7 个核心参数 + 4 种拒绝策略，结合项目举例' },
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
          { id:'t052', t:'在 JDK/Spring 中找应用：Runtime(单例)、BeanFactory(工厂)、JDK 观察者模式' },
          { id:'t053', t:'理解 Spring AOP 与代理模式的关系，对比代理模式与装饰器模式' },
          { id:'t054', t:'实践：用策略模式重构工作代码中一段 if-else 业务分支', practice:true },
          { id:'t055', t:'整理 5 种模式各 1 个面试问答：解决什么问题、项目里哪用过' },
        ]
      },
      { id:'s105', week:'全程并行', title:'算法热身（从第 1 天开始）',
        resources:[
          { label:'LeetCode 中国', url:'https://leetcode.cn/', type:'刷题' },
          { label:'代码随想录', url:'https://programmercarl.com/', type:'题单' },
        ],
        tasks:[
          { id:'t041', t:'每天 1 题 LeetCode Easy，坚持到求职结束（目标累计 120+）', parallel:true },
          { id:'t042', t:'第 1 月重点：数组、链表各 10 题' },
        ]
      },
    ]
  },
  {
    id:'p2', n:2, title:'基础设施 + 数据库 + JVM', sub:'Month 2.5–4.5 · 9周', color:'#1D9E75',
    note:'JVM 从后期前移至此，面试前留出足够消化时间',
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
          { id:'t111', t:'购买云服务器（2核2G），配置 SSH 密钥登录', optional:true },
          { id:'t112', t:'配置安全组/防火墙，理解入站出站端口规则', optional:true },
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
        ]
      },
    ]
  },
  {
    id:'p3', n:3, title:'个人微服务项目', sub:'Month 5–7 · 11周（核心，勿压缩）', color:'#EF9F27',
    note:'含 Kafka 实战与分布式事务接入，与微服务项目结合落地',
    sections:[
      { id:'s301', week:'Week 18–19', title:'项目脚手架搭建',
        resources:[
          { label:'Spring Cloud Alibaba', url:'https://sca.aliyun.com/', type:'官方' },
          { label:'Nacos 快速开始', url:'https://nacos.io/docs/latest/quickstart/quick-start/', type:'官方' },
          { label:'Gateway 文档', url:'https://docs.spring.io/spring-cloud-gateway/reference/', type:'官方' },
        ],
        tasks:[
          { id:'t201', t:'规划模块：gateway / auth / user / common，明确职责边界' },
          { id:'t202', t:'Maven 多模块父子工程 + dependencyManagement 统一版本', practice:true },
          { id:'t203', t:'接入 Nacos 服务注册 + 配置中心，服务互相发现', practice:true },
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
          { id:'t225', t:'验证：gateway→auth→user 全链路 traceId 一致', practice:true },
        ]
      },
      { id:'s304', week:'Week 24–25', title:'SkyWalking + 项目完善',
        resources:[
          { label:'SkyWalking 文档', url:'https://skywalking.apache.org/docs/', type:'官方' },
          { label:'Knife4j 文档', url:'https://doc.xiaominfo.com/', type:'官方' },
        ],
        tasks:[
          { id:'t231', t:'Docker 部署 SkyWalking OAP + UI', practice:true, optional:true },
          { id:'t232', t:'Java Agent 接入（-javaagent 参数）', practice:true, optional:true },
          { id:'t233', t:'UI 验证调用链路图、耗时分布、异常定位', optional:true },
          { id:'t234', t:'全局异常处理 @RestControllerAdvice + @Validated 参数校验', practice:true },
          { id:'t235', t:'Knife4j 接口文档，完善注解和描述', practice:true },
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
          { id:'t245', t:'项目落地：Kafka 实现异步业务（注册通知、订单状态变更等）', practice:true },
        ]
      },
      { id:'s306', week:'Week 28', title:'分布式事务',
        resources:[
          { label:'Seata 官方文档', url:'https://seata.io/zh-cn/docs/overview/what-is-seata.html', type:'官方' },
          { label:'JavaGuide 分布式事务', url:'https://javaguide.cn/distributed-system/distributed-transaction.html', type:'网站' },
          { label:'SCA Seata 接入', url:'https://sca.aliyun.com/docs/2022/user-guide/seata/overview/', type:'官方' },
        ],
        tasks:[
          { id:'t251', t:'本地事务 vs 分布式事务，2PC/TCC/Saga/消息最终一致性 对比' },
          { id:'t252', t:'Seata AT 模式原理：undo log、一阶段提交、二阶段异步删除' },
          { id:'t253', t:'AT vs TCC vs Saga 适用场景：何时用 Seata、何时用 MQ 最终一致性' },
          { id:'t254', t:'实践：微服务项目接入 Seata，实现跨服务下单扣库存', practice:true },
          { id:'t255', t:'面试准备：哪些场景其实不需要分布式事务（避免过度设计）' },
        ]
      },
    ]
  },
  {
    id:'p4', n:4, title:'深度技术提升', sub:'Month 7.5–8.5 · 6周', color:'#7F77DD',
    sections:[
      { id:'s401', week:'Week 29–30', title:'Redis 深入',
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
      { id:'s402', week:'Week 31–32', title:'系统设计基础',
        resources:[
          { label:'《Kafka 权威指南》', type:'书籍' },
          { label:'Sentinel 文档', url:'https://sentinelguard.io/zh-cn/docs/introduction.html', type:'官方' },
          { label:'JavaGuide 系统设计', url:'https://javaguide.cn/system-design/', type:'网站' },
        ],
        tasks:[
          { id:'t311', t:'Kafka 概念巩固：Topic/Partition/ConsumerGroup/Offset，结合 Phase3 实战回顾' },
          { id:'t312', t:'Sentinel 熔断降级接入项目，理解滑动窗口统计', practice:true, optional:true },
          { id:'t313', t:'雪花算法结构 + 时钟回拨问题与方案' },
          { id:'t314', t:'限流：令牌桶 vs 漏桶 vs 滑动窗口适用场景' },
          { id:'t315', t:'设计秒杀方案：Redis 预减 + Kafka 异步落库 + 幂等', practice:true },
        ]
      },
      { id:'s407', week:'Week 33', title:'JVM 复习巩固',
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
      { id:'s404', week:'Week 34', title:'项目完善与文档',
        resources:[
          { label:'JUnit 5 文档', url:'https://junit.org/junit5/docs/current/user-guide/', type:'官方' },
          { label:'JMeter 用户手册', url:'https://jmeter.apache.org/usermanual/index.html', type:'官方' },
          { label:'draw.io', url:'https://app.diagrams.net/', type:'工具' },
        ],
        tasks:[
          { id:'t331', t:'JUnit 5 + Mockito 单测，核心 Service 覆盖率 60%', practice:true, optional:true },
          { id:'t332', t:'JMeter 压测核心接口，分析 TPS/响应时间/错误率', practice:true, optional:true },
          { id:'t333', t:'README：架构图 + 技术选型 + 本地一键启动', practice:true },
          { id:'t334', t:'整理项目亮点 3-5 条，STAR 法则准备讲解稿' },
          { id:'t335', t:'录制 3-5 分钟项目 demo 视频', optional:true },
        ]
      },
    ]
  },
  {
    id:'p5', n:5, title:'求职冲刺', sub:'Month 8.5–10 · 6周', color:'#D85A30',
    sections:[
      { id:'s501', week:'Week 35–37', title:'算法强化',
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
          { id:'t405', t:'目标：本阶段再完成 40 道 Medium，累计总量 120+ 题' },
          { id:'t406', t:'每天 1 题保持手感，直到拿到 offer', parallel:true },
        ]
      },
      { id:'s502', week:'Week 38–40', title:'面试冲刺',
        resources:[
          { label:'JavaGuide 面试题', url:'https://javaguide.cn/interview-preparation/interview-preparation.html', type:'网站' },
          { label:'小林 coding', url:'https://xiaolincoding.com/', type:'图解' },
          { label:'《Java 面试指北》', url:'https://javaguide.cn/zhuanlan/java-mian-shi-zhi-bei.html', type:'专栏' },
        ],
        tasks:[
          { id:'t411', t:'Java 高频 50 题：用自己的话写出理解（不死记硬背）' },
          { id:'t412', t:'MySQL/Redis/Spring/分布式各 20 条高频题 + 答案' },
          { id:'t413', t:'简历优化：项目放首位，量化工作经历（QPS/优化幅度）' },
          { id:'t414', t:'模拟面试 3 次：自我介绍+技术题+项目讲解+反问', practice:true },
          { id:'t415', t:'投递 20-30 家，优先 B 轮以上有技术氛围的互联网公司' },
        ]
      },
    ]
  },
];
